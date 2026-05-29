const fs = require('fs');
const path = require('path');

const rootDirectory = './';

// In folders ko ti touch nahi karna hai
const ignoreList = ['node_modules', '.git', '.vscode'];

function renameFoldersToLowerCase(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);

        if (fs.statSync(fullPath).isDirectory()) {
            if (!ignoreList.includes(item)) {
                
                // 1. Pehle folder ke andar jao (Bottom-up approach)
                renameFoldersToLowerCase(fullPath);

                // 2. Wapas aate waqt is folder ka naam theek karo
                const oldName = item;
                // Naya naam: Sab chote akshar, aur space/underscore ki jagah hyphen (-)
                const newName = oldName.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');

                if (oldName !== newName) {
                    const oldPath = path.join(dir, oldName);
                    const newPath = path.join(dir, newName);

                    try {
                        // Windows me case-only rename error se bachne ke liye Temporary step
                        const tempPath = path.join(dir, newName + '-temp');
                        
                        // Step A: 'Assets' ko 'assets-temp' karo
                        fs.renameSync(oldPath, tempPath); 
                        // Step B: 'assets-temp' ko final 'assets' karo
                        fs.renameSync(tempPath, newPath); 

                        console.log(`📂 Renamed Folder: '${oldName}' ➡️ '${newName}'`);
                    } catch (err) {
                        console.error(`❌ Error renaming folder ${oldName}:`, err);
                    }
                }
            }
        }
    }
}

console.log("🚀 Folder scanner shuru ho raha hai...");
renameFoldersToLowerCase(rootDirectory);
console.log("✨ Saare folders successfully lowercase aur clean ho gaye hain!");