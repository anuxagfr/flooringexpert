const fs = require('fs');
const path = require('path');

// Yahan us file ka naam likhein jo aap sab pages me link karna chahte hain
const jsFileName = '/main.js'; 
const scriptToInject = `<script src="${jsFileName}"></script>`;

const directoryToScan = './';

function injectScriptInFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(dir, file);
            
            if (fs.statSync(filePath).isDirectory()) {
                if (file !== 'node_modules' && file !== '.git') {
                    injectScriptInFiles(filePath);
                }
            } else if (path.extname(filePath) === '.html') {
                let content = fs.readFileSync(filePath, 'utf8');

                // Code check karega ki kya '/main.js' pehle se file me linked hai ya nahi
                if (!content.includes(`src="${jsFileName}"`)) {
                    
                    const bodyRegex = /<\/body>/i;
                    
                    if (bodyRegex.test(content)) {
                        // </body> se theek pehle naya link add kar dega
                        const updatedContent = content.replace(bodyRegex, `    ${scriptToInject}\n</body>`);
                        
                        fs.writeFileSync(filePath, updatedContent, 'utf8');
                        console.log(`✅ Success: Added to ${filePath}`);
                    } else {
                        console.log(`⚠️ Warning: </body> tag NOT FOUND in ${filePath}`);
                    }
                } else {
                    console.log(`⏭️ Skipped: ${jsFileName} already linked in ${filePath}`);
                }
            }
        });
    });
}

console.log("Scanning files for exact script injection...");
injectScriptInFiles(directoryToScan);