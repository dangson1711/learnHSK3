const ts = require('typescript');
const fs = require('fs');
let code = fs.readFileSync('src/data/dialogues.ts', 'utf-8');
const sourceFile = ts.createSourceFile('test.ts', code, ts.ScriptTarget.Latest, true);
console.log('parsed');
