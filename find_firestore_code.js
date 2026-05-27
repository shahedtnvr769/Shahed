const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const code = match[1];
    if (code.includes('onSnapshot') || code.includes('getDoc') || code.includes('profileData') || code.includes('posts')) {
        console.log(`Script block #${count} contains profileData/posts/onSnapshot/getDoc!`);
        const lines = code.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes('onSnapshot') || line.includes('getDoc') || line.includes('profile') || line.includes('posts')) {
                // print if line length is small enough (to avoid printing massive base64 lines)
                if (line.length < 200) {
                    console.log(`Line ${idx + 1}: ${line.trim()}`);
                } else {
                    console.log(`Line ${idx + 1}: [long line: ${line.substring(0, 100)}...]`);
                }
            }
        });
    }
}
