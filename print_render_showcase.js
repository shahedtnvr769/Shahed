const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

for (let i = 1778; i <= 1845; i++) {
    const line = lines[i - 1];
    if (line.length > 200) {
        console.log(`${i}: [length ${line.length}] ${line.substring(0, 100)}...`);
    } else {
        console.log(`${i}: ${line}`);
    }
}
