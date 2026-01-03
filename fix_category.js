const fs = require('fs');
const path = require('path');

const categoryFile = path.join(process.cwd(), 'model/category.js');
if (fs.existsSync(categoryFile)) {
    let content = fs.readFileSync(categoryFile, 'utf8');

    // 1. Extract categoryImages array content
    const imgRegex = /const categoryImages = \[([\s\S]*?)\];/;
    const match = content.match(imgRegex);
    
    if (match) {
        const imgBody = match[1];
        // Extract URLs (assuming single quotes)
        const images = [];
        const urlMatch = imgBody.match(/'([^']+)'/g);
        if (urlMatch) {
            urlMatch.forEach(urlWithQuotes => {
                images.push(urlWithQuotes.replace(/'/g, ''));
            });
        }
        
        console.log(`Found ${images.length} images in categoryImages.`);

        // 2. Replace references like categoryImages[0] with the actual URL string
        content = content.replace(/categoryImages\[(\d+)\]/g, (m, index) => {
            const idx = parseInt(index);
            if (idx >= 0 && idx < images.length) {
                return `'${images[idx]}'`;
            }
            return m; // Keep original if index out of bounds
        });
        
        console.log('Replaced categoryImages references with literals.');
        
        fs.writeFileSync(categoryFile, content, 'utf8');
    } else {
        console.log('categoryImages array not found in model/category.js');
    }
} else {
    console.log('model/category.js not found');
}
