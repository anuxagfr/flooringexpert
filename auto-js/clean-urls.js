const fs = require('fs');
const path = require('path');

const rootDirectory = './';
const ignoreList = ['node_modules', '.git', '.vscode'];

// Regex jo HTML files ke andar href="..." links ko dhoondhega
const hrefRegex = /href=(["'])(.*?)\.html\1/gi;

function removeHtmlExtensionFromLinks(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    for (const file of items) {
        const filePath = path.join(dir, file);
        let stat;
        try { stat = fs.statSync(filePath); } catch (e) { continue; }

        if (stat.isDirectory()) {
            if (!ignoreList.includes(file)) {
                removeHtmlExtensionFromLinks(filePath);
            }
        } 
        else if (['.html', '.js'].includes(path.extname(file).toLowerCase())) {
            let content = fs.readFileSync(filePath, 'utf8');
            let isUpdated = false;

            // Href links se .html hatayein (lekin external links ko touch na karein)
            const newContent = content.replace(hrefRegex, (match, quote, linkPath) => {
                // Agar link external hai ya sirf '/' hai toh skip karein
                if (linkPath.startsWith('http') || linkPath.startsWith('//') || linkPath === 'index') {
                    return match;
                }
                isUpdated = true;
                return `href=${quote}${linkPath}${quote}`;
            });

            if (isUpdated) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`🧹 Cleaned URLs in: ${filePath}`);
            }
        }
    }
}

console.log("🔍 Scanning code to remove .html from internal links...");
removeHtmlExtensionFromLinks(rootDirectory);
console.log("✨ Saare links se .html successfully hat gaya hai!");