
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '库存', '库存文件.MD');

function parseMd(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    
    const products = [];
    let currentCategory = "默认";
    
    let startIdx = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("车型") && lines[i].includes("产品名称")) {
            startIdx = i + 1;
            break;
        }
    }
    
    for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        let parts = line.split(/\t+/);
        if (parts.length < 2) {
            parts = line.split(/\s{2,}/);
        }
        
        if (parts.length < 2) continue;
        
        let category = parts[0].trim();
        let name = parts[1].trim();
        // 车型(0) 产品名称(1) 编号(2) 库存(3)
        // Check if index 3 exists and is a number
        let stock = 0;
        if (parts.length > 3) {
             const stockStr = parts[3].trim();
             if (!isNaN(parseFloat(stockStr))) {
                 stock = parseFloat(stockStr);
             }
        }

        if (!parts[0] || (line.match(/^\s+/) && parts[0] === name)) {
            category = currentCategory;
            if (!parts[0] || parts[0].trim() === "") {
                name = parts[1].trim();
            } else {
                 name = parts[0].trim();
            }
        } else {
            currentCategory = category;
        }
        
        products.push({
            category: currentCategory,
            name: name,
            stock: stock
        });
    }
    return products;
}

const products = parseMd(filePath);

const categories = {};
let catIdCounter = 1000;

products.forEach(p => {
    const cat = p.category;
    if (!categories[cat]) {
        categories[cat] = {
            id: String(catIdCounter++),
            name: cat,
            products: []
        };
    }
    categories[cat].products.push(p);
});

// Generate goods.js
const imagePool = [
    'cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101215940_354_124.jpg',
    'cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101215941_355_124.jpg',
    'cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101215942_356_124.jpg',
    'cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101220011_361_124.jpg',
    'cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101220012_362_124.jpg',
    'cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101220013_363_124.jpg',
];

const baseGood = {
    saasId: '88888888',
    storeId: '1000',
    spuId: '0',
    title: '',
    primaryImage: '',
    images: [],
    minSalePrice: 0,
    minLinePrice: 0,
    maxSalePrice: 0,
    maxLinePrice: 0,
    spuStockQuantity: 999,
    soldNum: 0,
    isPutOnSale: 1,
    categoryIds: [],
    specList: [],
    skuList: [],
    spuTagList: []
};

const goodEntries = products.map((p, i) => {
    const newGood = { ...baseGood };
    newGood.spuId = String(i);
    newGood.title = p.name;
    
    // Use Stock as Price value (conceptually) for now, but UI will label it as Stock
    // Wait, if we use stock as price, then calculations might be weird.
    // But user said "Change price to stock".
    // Let's store stock in spuStockQuantity.
    // And store stock in minSalePrice too? No, that's confusing.
    // Let's keep price as 0 or a placeholder?
    // User said "Price is not needed".
    // I will set price to 0.
    // But I will set spuStockQuantity to the real stock.
    
    newGood.minSalePrice = 0; 
    newGood.minLinePrice = 0;
    newGood.maxSalePrice = 0;
    newGood.maxLinePrice = 0;
    
    // IMPORTANT: The user wants to see Stock INSTEAD of Price.
    // In many places, the app displays `minSalePrice`.
    // If I put stock into `minSalePrice`, it will display "¥2".
    // I will modify the UI to display `spuStockQuantity` and remove `¥`.
    
    // User requested to set all stock to 10
    newGood.spuStockQuantity = 10;
    
    const catId = categories[p.category].id;
    newGood.categoryIds = [catId, catId + '0', catId + '00'];
    
    const img = imagePool[i % imagePool.length];
    newGood.primaryImage = img;
    newGood.images = [img];
    
    newGood.specList = [{
        specId: "100",
        title: "规格",
        specValueList: [{specValueId: "101", specValue: "默认", image: null}]
    }];
    
    newGood.skuList = [{
        skuId: `${i}01`,
        skuImage: img,
        specInfo: [{specId: "100", specValueId: "101", specValue: "默认"}],
        priceInfo: [{priceType: 1, price: 0, priceTypeName: "销售价格"}],
        stockInfo: {stockQuantity: 10}
    }];
    
    newGood.spuTagList = []; 
    
    return JSON.stringify(newGood, null, 2);
});

const goodJsContent = `import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const defaultDesc = ['cloud://cloud1-9gam6dljf45914e3.636c-cloud1-9gam6dljf45914e3-1394158969/微信图片_20260101220112_382_124.jpg'];

const allGoods = [
${goodEntries.join(',\n')}
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
export function genGood(id, available = 1) {
  let item = allGoods.find((good) => good.spuId === id);
  if (!item) {
      const idx = parseInt(id) % allGoods.length;
      item = allGoods[isNaN(idx) ? 0 : idx];
  }

  if (!item) return {};

  return {
    ...item,
    spuId: \`\${id}\`,
    available: available,
    desc: item?.desc || defaultDesc,
    images: item?.images || [item?.primaryImage],
    thumb: item.primaryImage,
  };
}

export { allGoods };
`;

fs.writeFileSync(path.join(__dirname, 'model', 'good.js'), goodJsContent);

console.log('Done');
