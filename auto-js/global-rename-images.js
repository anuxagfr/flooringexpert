const fs = require('fs');
const path = require('path');

// Poore project folder ko target karne ke liye root path
const rootDirectory = './'; 

// Jo image extensions aapko rename karni hain
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];

function renameImagesGlobally(dir) {
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir).forEach(file => {
        const oldPath = path.join(dir, file);
        const stat = fs.statSync(oldPath);

        // 1. Agar folder hai toh uske andar jao (Recursive Scanning)
        if (stat.isDirectory()) {
            // In folders ko touch nahi karna hai
            if (file !== 'node_modules' && file !== '.git' && file !== '.vscode') {
                renameImagesGlobally(oldPath);
            }
        } 
        // 2. Agar file hai toh check karo kya wo image hai
        else {
            const ext = path.extname(file).toLowerCase();
            
            if (allowedExtensions.includes(ext)) {
                // File name bina extension ke extract karein
                const nameWithoutExt = path.basename(file, path.extname(file));
                
                // Naya Naam Logic: 
                // - Sab lowercase (chote akshar)
                // - Spaces aur Underscores ko '-' se replace karna
                // - Double hyphens '--' ko single '-' karna clean-up ke liye
                const newFileName = nameWithoutExt.toLowerCase()
                                    .replace(/\s+/g, '-')
                                    .replace(/_/g, '-')
                                    .replace(/-+/g, '-') 
                                    + ext;

                const newPath = path.join(dir, newFileName);

                // Agar naam sach mein badal raha hai tabhi rename karein
                if (oldPath !== newPath) {
                    fs.renameSync(oldPath, newPath);
                    console.log(`📸 Updated Image: ${oldPath} ➡️  ${newFileName}`);
                }
            }
        }
    });
}

console.log("🚀 Global Image Scanner shuru ho raha hai...");
console.log("Scanning all folders inside Flooring Expert project...");

renameImagesGlobally(rootDirectory);

console.log("✨ Poore project ki saari images successfully rename ho gayi hain!");