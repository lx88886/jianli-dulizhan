const fs = require('fs');
const path = require('path');

const categoryFile = path.join(process.cwd(), 'model/category.js');
console.log('Reading file:', categoryFile);

if (fs.existsSync(categoryFile)) {
    let content = fs.readFileSync(categoryFile, 'utf8');
    // console.log('File content preview:', content.substring(0, 500));

    const imgRegex = /const categoryImages = \[([\s\S]*?)\];/;
    const match = content.match(imgRegex);
    
    if (match) {
        console.log('Regex matched!');
        const imgBody = match[1];
        const images = [];
        // Support both single and double quotes
        const urlMatch = imgBody.match(/['"]([^'"]+)['"]/g);
        if (urlMatch) {
            urlMatch.forEach(urlWithQuotes => {
                images.push(urlWithQuotes.replace(/['"]/g, ''));
            });
        }
        
        console.log(`Found ${images.length} images:`, images);

        if (images.length > 0) {
             content = content.replace(/categoryImages\[(\d+)\]/g, (m, index) => {
                const idx = parseInt(index);
                const safeIdx = idx % images.length;
                return `'${images[safeIdx]}'`;
            });
            
            console.log('Writing changes to file...');
            fs.writeFileSync(categoryFile, content, 'utf8');
            console.log('Done.');
        }
    } else {
        console.log('Regex NOT matched.');
    }
} else {
    console.log('File not found.');
}
