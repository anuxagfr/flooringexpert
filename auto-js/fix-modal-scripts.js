const fs = require('fs');
const path = require('path');

const rootDirectory = './';
const ignoreList = ['node_modules', '.git', '.vscode'];

// Regex dhoondhne ke liye: const basePath = `/any/path/${name}`;
const regex = /(const|let|var)\s+basePath\s*=\s*`([^`]*?)\$\{name\}([^`]*?)`;/g;

function fixModalScriptsGlobally(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        let stat;
        
        try { stat = fs.statSync(fullPath); } catch (e) { continue; }

        if (stat.isDirectory()) {
            if (!ignoreList.includes(item)) {
                fixModalScriptsGlobally(fullPath);
            }
        } 
        else if (path.extname(item).toLowerCase() === '.html') {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Agar file me basePath aur ${name} likha hai
            if (content.includes('basePath') && content.includes('${name}')) {
                
                // Check karein ki pehle se formattedName toh add nahi kar diya
                if (!content.includes('const formattedName =')) {
                    
                    const newContent = content.replace(regex, (match, keyword, beforePath, afterPath) => {
                        // Naya code jo purane basePath ki jagah replace hoga
                        return `const formattedName = name.toLowerCase().replace(/\\s+/g, '-').replace(/_/g, '-');\n            ${keyword} basePath = \`${beforePath}\${formattedName}${afterPath}\`;`;
                    });

                    // Agar replace successfully ho gaya toh file save karein
                    if (content !== newContent) {
                        fs.writeFileSync(fullPath, newContent, 'utf8');
                        console.log(`✅ Modal script fixed in: ${fullPath}`);
                    }
                } else {
                    console.log(`⏭️ Skipped (Already fixed): ${fullPath}`);
                }
            }
        }
    }
}

console.log("🚀 Scanning HTML files for modal image paths...");
fixModalScriptsGlobally(rootDirectory);
console.log("✨ Boom! Saari files mein script update ho gayi hai.");