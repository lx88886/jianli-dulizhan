
const db = wx.cloud.database();
const _ = db.command;

export const cloudService = {
  /**
   * 初始化数据库集合
   * 确保商品集合存在
   */
  async initCollections() {
    try {
      // 尝试添加一个测试记录来创建 goods 集合
      await db.collection('goods').add({
        data: {
          _init: true,
          spuId: '__init__',
          title: '__初始化__',
          isPutOnSale: 0
        }
      });
      // 删除初始化记录
      await db.collection('goods').where({ _init: true }).remove();
      console.log('goods 集合初始化成功');
    } catch (e) {
      // 集合可能已存在，这是正常的
      console.log('goods 集合已存在或初始化成功');
    }
  },

  // Check if we should use cloud (can be toggled or just assume yes for admin)
  
  /**
   * Initialize Cloud Database with local mock data
   * @param {Array} goods 
   * @param {Array} categories 
   */
  async initData(goods, categories) {
    // 1. Clear existing (optional, maybe dangerous) or just add
    // For now, let's just add if not exists or maybe the user just wants to add
    
    // We'll insert goods
    let successCount = 0;
    let failCount = 0;

    for (const good of goods) {
      try {
        // Remove _id if it exists in mock data to let Mongo generate it or use spuId
        const { _id, ...goodData } = good;
        
        // Check if exists
        const check = await db.collection('goods').where({
          spuId: goodData.spuId
        }).get();

        if (check.data.length === 0) {
          await db.collection('goods').add({
            data: {
              ...goodData,
              createTime: db.serverDate(),
              updateTime: db.serverDate()
            }
          });
          successCount++;
        }
      } catch (e) {
        console.error(e);
        failCount++;
      }
    }
    
    return { successCount, failCount };
  },

  /**
   * Fetch Goods List
   */
  async getGoodsList(page = 1, pageSize = 20) {
    return db.collection('goods')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
  },

  async getGoodsListForCustomer(page = 1, pageSize = 20) {
    return db.collection('goods')
      .where({ isPutOnSale: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
  },

  /**
   * Get Good Detail
   */
  async getGood(id) {
    return db.collection('goods').doc(id).get();
  },

  async getGoodBySpuId(spuId) {
    const res = await db.collection('goods').where({ spuId: spuId }).get();
    return res.data[0];
  },

  /**
   * Add Good
   */
  async addGood(good) {
    return db.collection('goods').add({
      data: {
        ...good,
        createTime: db.serverDate(),
        updateTime: db.serverDate(),
        soldNum: 0,
      }
    });
  },

  /**
   * Update Good
   */
  async updateGood(id, data) {
    return db.collection('goods').doc(id).update({
      data: {
        ...data,
        updateTime: db.serverDate()
      }
    });
  },

  /**
   * Delete Good (or soft delete)
   */
  async deleteGood(id) {
    return db.collection('goods').doc(id).remove();
  },
  
  /**
   * Upload Image
   */
  async uploadImage(filePath) {
    const cloudPath = `goods/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}${filePath.match(/\.[^.]+?$/)[0]}`;
    return wx.cloud.uploadFile({
      cloudPath,
      filePath,
    });
  }
};
