const fs = require('fs');
const content = fs.readFileSync('src/data/vocabulary.ts', 'utf-8');

const match = content.match(/export const HSK_1_WORDS_LIST = \[([\s\S]*?)\];/);
if (match) {
    const arr = eval(`[${match[1]}]`);
    console.log("Found", arr.length, "words");
}
