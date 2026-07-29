const fs = require('fs');
const content = fs.readFileSync('src/data/vocabulary.ts', 'utf-8');

const match = content.match(/export const HSK_1_WORDS_LIST = \[([\s\S]*?)\];/);
if (match) {
    console.log("Found words block, length:", match[1].length);
} else {
    console.log("Not found");
}
