const fs = require('fs');
const path = require('path');

const rootDirectory = './';
const ignoreList = ['node_modules', '.git', '.vscode'];

// Naya phone number formats
const newPhoneText = '+91 87963 27068';
const newPhoneLink = '918796327068';

function updatePhoneNumberGlobally(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        let stat;
        try { stat = fs.statSync(fullPath); } catch (e) { continue; }

        if (stat.isDirectory()) {
            if (!ignoreList.includes(item)) {
                updatePhoneNumberGlobally(fullPath);
            }
        } 
        else if (['.html', '.js', '.json'].includes(path.extname(item).toLowerCase())) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let initialContent = content;

            // 1. WhatsApp API Links fix (wa.me/918796327068 ya wa.me/918796327068)
            content = content.replace(/wa\.me\/(91)?(+91 87963 27068|+91 87963 27068)/gi, `wa.me/${newPhoneLink}`);
            
            // 2. Clickable Call Links fix (tel:+918796327068, tel:+918796327068)
            content = content.replace(/tel:\+?(91)?\s*(99109\s*27068|99589\s*98122)/gi, `tel:+${newPhoneLink}`);

            // 3. Plain UI Text Formats fix (with or without spaces / country codes)
            content = content.replace(/\+?91\s*99109\s*27068/g, newPhoneText);
            content = content.replace(/\+?91\s*99589\s*98122/g, newPhoneText);
            content = content.replace(/99109\s*27068/g, newPhoneText);
            content = content.replace(/99589\s*98122/g, newPhoneText);

            if (content !== initialContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`📞 Phone number updated in: ${fullPath}`);
            }
        }
    }
}

console.log("🚀 Scanning files to update phone number to +91 87963 27068...");
updatePhoneNumberGlobally(rootDirectory);
console.log("✨ All done! Saari files mein phone number successfully badal gaya hai.");