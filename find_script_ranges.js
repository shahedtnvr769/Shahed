const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
    count++;
    const startIdx = match.index;
    const endIdx = regex.lastIndex;
    const startLine = html.substring(0, startIdx).split('\n').length;
    const endLine = html.substring(0, endIdx).split('\n').length;
    console.log(`Script #${count}: lines ${startLine} to ${endLine}`);
}
