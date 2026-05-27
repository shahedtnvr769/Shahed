const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
    count++;
    console.log(`Script #${count} attributes: "${match[1].trim()}" (Length of inner HTML: ${match[2].length})`);
}
