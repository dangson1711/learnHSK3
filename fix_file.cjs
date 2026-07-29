const fs = require('fs');
let code = fs.readFileSync('src/data/dialogues.ts', 'utf-8');
// find the array assignment
let match = code.match(/export const TOPIC_DIALOGUES: TopicDialogue\[\] = (\[[\s\S]*\]);/);
if (match) {
  let arrStr = match[1];
  // arrStr is the array. Let's fix consecutive commas.
  arrStr = arrStr.replace(/,\s*,/g, ',');
  code = code.replace(/export const TOPIC_DIALOGUES: TopicDialogue\[\] = \[[\s\S]*\];/, `export const TOPIC_DIALOGUES: TopicDialogue[] = ${arrStr};`);
  fs.writeFileSync('src/data/dialogues.ts', code);
  console.log('Fixed double commas');
}
