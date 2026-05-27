const fs = require('fs');

function checkMagicBytes(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`${filename} does not exist.`);
        return;
    }
    const buffer = fs.readFileSync(filename);
    console.log(`${filename} size: ${buffer.length} bytes`);
    console.log(`${filename} magic bytes:`, buffer.slice(0, 8).toString('hex'));
}

checkMagicBytes('about2.png');
checkMagicBytes('profile.jpg');
