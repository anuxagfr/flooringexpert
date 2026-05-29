const fs = require('fs');
const path = require('path');

// Yahan un JS files ka naam likhein jinke andar data update karna hai
// Maine 'search-data.js' bhi add kar diya hai (pichli photo ke hisaab se)
const filesToUpdate = ['global-search.js', 'search-data.js'];

// Yeh Regex JavaScript objects ki keys ko target karegi: image: '', link: '', url: ''
const jsDataRegex = /(image|img|url|link|href|src)\s*:\s*(["'])(.*?)\2/gi;

function formatPath(originalPath) {
    // External links ko ignore karein
    if (originalPath.startsWith('http') || originalPath.startsWith('//') || originalPath.startsWith('#') || originalPath.startsWith('data:')) {
        return originalPath;
    }

    const segments = originalPath.split('/');
    
    const newSegments = segments.map(segment => {
        if (segment === '' || segment === '.' || segment === '..') return segment;
        
        let cleanSegment = segment;
        try { cleanSegment = decodeURIComponent(segment); } catch (e) {}
        
        // Lowercase and hyphenate
        return cleanSegment.toLowerCase()
                           .replace(/\s+/g, '-') 
                           .replace(/_/g, '-')   
                           .replace(/-+/g, '-'); 
    });

    return newSegments.join('/');
}

filesToUpdate.forEach(fileName => {
    const filePath = path.join('./', fileName);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let isUpdated = false;

        // Content ke andar URLs dhoondhein aur update karein
        const newContent = content.replace(jsDataRegex, (match, key, quote, linkPath) => {
            const newPath = formatPath(linkPath);
            if (newPath !== linkPath) {
                isUpdated = true;
            }
            // Format wapas jodein (e.g., image: "/new-path.jpg")
            return `${key}: ${quote}${newPath}${quote}`;
        });

        if (isUpdated) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Success: Updated catalog URLs in ${fileName}`);
        } else {
            console.log(`⏭️ Skipped: No updates needed in ${fileName}`);
        }
    } else {
        console.log(`⚠️ Warning: ${fileName} nahi mili.`);
    }
});