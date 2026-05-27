const fs = require('fs');
const path = require('path');

const rootDirectory = './';

// Regex jo saare image links dhoondhega (src="...", href="...", url('...'))
const imagePathRegex = /(["'\(])([^"'\(\)]*\.(?:jpg|jpeg|png|webp|svg|gif))(["'\)])/gi;

function updateLinksGlobally(dir) {
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // 1. Agar folder hai toh uske andar scan karein
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.vscode') {
                updateLinksGlobally(filePath);
            }
        } 
        // 2. Agar HTML, CSS, ya JS file hai toh uske andar ke text ko read karein
        else if (['.html', '.css', '.js'].includes(path.extname(file).toLowerCase())) {
            let content = fs.readFileSync(filePath, 'utf8');
            let isFileUpdated = false;

            const updatedContent = content.replace(imagePathRegex, (match, openQuote, imgPath, closeQuote) => {
                // File ka naam aur folder ka path alag karein
                // Example: 'assets/images/my-file.jpg'
                // dirName = 'assets/images', fileName = 'my-file.jpg'
                const dirName = path.dirname(imgPath);
                const fileName = path.basename(imgPath);

                // Naya naam banane ka EXACT SAME logic jo humne rename script me use kiya tha
                const newFileName = fileName.toLowerCase()
                                    .replace(/\s+/g, '-')
                                    .replace(/_/g, '-')
                                    .replace(/-+/g, '-');

                // Path ko wapas jodein
                // Agar path me folder nahi tha (sirf 'image.jpg' likha tha), toh use waise hi rakhein
                const newImgPath = dirName === '.' ? newFileName : `${dirName}/${newFileName}`;

                // Agar purana path aur naya path alag hai, tabhi update maanein
                if (imgPath !== newImgPath) {
                    isFileUpdated = true;
                }

                // Updated link return karein quotes ke sath
                return `${openQuote}${newImgPath}${closeQuote}`;
            });

            // Agar is file mein koi link update hua hai, toh file ko save kar dein
            if (isFileUpdated) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`✅ Updated links in: ${filePath}`);
            }
        }
    });
}

console.log("🔍 Scanning HTML/CSS files to update image paths...");
updateLinksGlobally(rootDirectory);
console.log("✨ Saare image links successfully update ho gaye hain!");