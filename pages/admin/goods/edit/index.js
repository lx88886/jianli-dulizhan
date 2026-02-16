import { cloudService } from '../../../../services/cloud/index';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    id: null,
    // 基础信息
    title: '',
    stock: 999,
    isPutOnSale: true,

    // 商品图片（轮播图）
    imagesList: [],
    imagesGridConfig: { column: 3 },

    // 商品详情图
    descList: [],
    descGridConfig: { column: 3 },

    // 规格管理
    hasSpecs: false, // 是否启用多规格
    specList: [], // 规格列表 [{specId, title, specValueList: [{specValueId, specValue}]}]
    skuList: [], // SKU列表 [{skuId, specInfo, stockQuantity}]

    // 当前编辑的规格
    currentSpecName: '',
    currentSpecValues: [],
    currentSpecValue: '',
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      this.fetchDetail(options.id);
    }
  },

  async fetchDetail(id) {
    try {
      const res = await cloudService.getGood(id);
      const data = res.data;

      // 处理图片列表
      const imagesList = (data.images || []).map(url => ({ url }));
      const descList = (data.desc || []).map(url => ({ url }));

      this.setData({
        title: data.title || '',
        stock: data.spuStockQuantity || 999,
        isPutOnSale: data.isPutOnSale === 1,
        imagesList,
        descList,
        hasSpecs: !!(data.specList && data.specList.length > 0),
        specList: data.specList || [],
        skuList: (data.skuList || []).map(sku => ({
          skuId: sku.skuId,
          specInfo: sku.specInfo || [],
          stockQuantity: sku.stockInfo?.stockQuantity || 0
        }))
      });
    } catch (e) {
      console.error(e);
    }
  },

  // ============ 基础信息 ============
  onTitleChange(e) {
    const value = e.detail.value;
    if (this.data.title === value) return;
    this.setData({ title: value });
  },

  onStockChange(e) {
    const value = e.detail.value;
    if (this.data.stock === value) return;
    this.setData({ stock: value });
  },

  onSaleStatusChange(e) {
    const value = e.detail.value;
    if (this.data.isPutOnSale === value) return;
    this.setData({ isPutOnSale: value });
  },

  // ============ 商品图片上传 ============
  async onAddImages(e) {
    const { files } = e.detail;
    try {
      const file = files[0];
      Toast({ context: this, selector: '#t-toast', message: '上传中...', theme: 'loading', duration: 0 });

      const res = await cloudService.uploadImage(file.url);
      const imagesList = [...this.data.imagesList, { url: res.fileID }];

      this.setData({ imagesList });
      Toast({ context: this, selector: '#t-toast', message: '上传成功', theme: 'success' });
    } catch (e) {
      console.error(e);
      Toast({ context: this, selector: '#t-toast', message: '上传失败', theme: 'fail' });
    }
  },

  onRemoveImage(e) {
    const { index } = e.detail;
    const imagesList = this.data.imagesList.filter((_, i) => i !== index);
    this.setData({ imagesList });
  },

  // ============ 商品详情图上传 ============
  async onAddDescImages(e) {
    const { files } = e.detail;
    try {
      const file = files[0];
      Toast({ context: this, selector: '#t-toast', message: '上传中...', theme: 'loading', duration: 0 });

      const res = await cloudService.uploadImage(file.url);
      const descList = [...this.data.descList, { url: res.fileID }];

      this.setData({ descList });
      Toast({ context: this, selector: '#t-toast', message: '上传成功', theme: 'success' });
    } catch (e) {
      console.error(e);
      Toast({ context: this, selector: '#t-toast', message: '上传失败', theme: 'fail' });
    }
  },

  onRemoveDescImage(e) {
    const { index } = e.detail;
    const descList = this.data.descList.filter((_, i) => i !== index);
    this.setData({ descList });
  },

  // ============ 规格管理 ============
  onSpecsSwitchChange(e) {
    const hasSpecs = e.detail.value;
    this.setData({
      hasSpecs,
      // 关闭规格时清空数据
      specList: hasSpecs ? this.data.specList : [],
      skuList: hasSpecs ? this.data.skuList : []
    });
  },

  // 添加规格
  onAddSpec() {
    const { currentSpecName, currentSpecValues } = this.data;
    if (!currentSpecName.trim()) {
      Toast({ context: this, selector: '#t-toast', message: '请输入规格名称', theme: 'fail' });
      return;
    }
    if (currentSpecValues.length === 0) {
      Toast({ context: this, selector: '#t-toast', message: '请至少添加一个规格值', theme: 'fail' });
      return;
    }

    const specId = String(Date.now());
    const specValueList = currentSpecValues.map((value, index) => ({
      specValueId: `${specId}_${index}`,
      specValue: value
    }));

    const specList = [...this.data.specList, {
      specId,
      title: currentSpecName,
      specValueList
    }];

    this.setData({
      specList,
      currentSpecName: '',
      currentSpecValues: []
    });

    // 自动生成SKU
    this.generateSkuList(specList);
  },

  // 删除规格
  onDeleteSpec(e) {
    const index = e.currentTarget.dataset.index;
    const specList = this.data.specList.filter((_, i) => i !== index);
    this.setData({ specList });
    this.generateSkuList(specList);
  },

  // 添加规格值
  onAddSpecValue() {
    const value = this.data.currentSpecValue || '';
    if (!value.trim()) {
      Toast({ context: this, selector: '#t-toast', message: '请输入规格值', theme: 'fail' });
      return;
    }

    const currentSpecValues = [...this.data.currentSpecValues, value];
    this.setData({
      currentSpecValues,
      currentSpecValue: ''
    });
  },

  onSpecValueInput(e) {
    const value = e.detail.value;
    if (this.data.currentSpecValue === value) return;
    this.setData({ currentSpecValue: value });
  },

  onCurrentSpecNameInput(e) {
    const value = e.detail.value;
    if (this.data.currentSpecName === value) return;
    this.setData({ currentSpecName: value });
  },

  // 删除当前规格值
  onDeleteSpecValue(e) {
    const index = e.currentTarget.dataset.index;
    const currentSpecValues = this.data.currentSpecValues.filter((_, i) => i !== index);
    this.setData({ currentSpecValues });
  },

  // 生成SKU列表（笛卡尔积）
  generateSkuList(specList) {
    if (specList.length === 0) {
      this.setData({ skuList: [] });
      return;
    }

    // 计算所有规格的组合
    const cartesian = (arrays) => {
      if (arrays.length === 0) return [[]];
      const [first, ...rest] = arrays;
      const restCombinations = cartesian(rest);
      const combinations = [];
      for (const value of first) {
        for (const restCombination of restCombinations) {
          combinations.push([value, ...restCombination]);
        }
      }
      return combinations;
    };

    const specValuesArrays = specList.map(spec =>
      spec.specValueList.map(value => ({
        specId: spec.specId,
        specValueId: value.specValueId,
        specValue: value.specValue
      }))
    );

    const combinations = cartesian(specValuesArrays);

    const skuList = combinations.map((specInfo, index) => ({
      skuId: `sku_${Date.now()}_${index}`,
      specInfo,
      stockQuantity: 100 // 默认库存
    }));

    this.setData({ skuList });
  },

  // 更新SKU库存
  onSkuStockChange(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const newQuantity = parseInt(value) || 0;

    // 如果值没有改变，不更新（避免死循环）
    if (this.data.skuList[index].stockQuantity === newQuantity) {
      return;
    }

    const skuList = [...this.data.skuList];
    skuList[index].stockQuantity = newQuantity;

    // 计算总库存
    const totalStock = skuList.reduce((sum, sku) => sum + sku.stockQuantity, 0);

    // 合并成一次 setData，避免死循环
    this.setData({
      skuList,
      stock: totalStock
    });
  },

  // ============ 提交保存 ============
  async onSubmit() {
    const { id, title, stock, isPutOnSale, imagesList, descList, hasSpecs, specList, skuList } = this.data;

    // 验证必填项
    if (!title.trim()) {
      Toast({ context: this, selector: '#t-toast', message: '请输入商品标题', theme: 'fail' });
      return;
    }
    if (imagesList.length === 0) {
      Toast({ context: this, selector: '#t-toast', message: '请上传商品图片', theme: 'fail' });
      return;
    }

    // 构建商品数据
    const goodData = {
      title,
      spuStockQuantity: parseInt(stock),
      primaryImage: imagesList[0].url,
      images: imagesList.map(item => item.url),
      desc: descList.map(item => item.url),
      isPutOnSale: isPutOnSale ? 1 : 0,
      spuTagList: []
    };

    // 如果启用了规格
    if (hasSpecs && specList.length > 0) {
      goodData.specList = specList;
      goodData.skuList = skuList.map(sku => ({
        skuId: sku.skuId,
        specInfo: sku.specInfo,
        stockInfo: {
          stockQuantity: sku.stockQuantity
        }
      }));
    } else {
      // 单规格商品，添加默认SKU
      goodData.specList = [{
        specId: 'default_spec',
        title: '规格',
        specValueList: [{
          specValueId: 'default_value',
          specValue: '默认'
        }]
      }];
      goodData.skuList = [{
        skuId: `sku_${Date.now()}`,
        specInfo: [{
          specId: 'default_spec',
          specValueId: 'default_value',
          specValue: '默认'
        }],
        stockInfo: {
          stockQuantity: parseInt(stock)
        }
      }];
    }

    // 新商品设置ID
    if (!id) {
      goodData.spuId = String(Date.now());
      goodData.storeId = '1000';
    }

    try {
      Toast({ context: this, selector: '#t-toast', message: '保存中...', theme: 'loading', duration: 0 });

      if (id) {
        await cloudService.updateGood(id, goodData);
      } else {
        await cloudService.addGood(goodData);
      }

      Toast({ context: this, selector: '#t-toast', message: '保存成功', theme: 'success' });
      setTimeout(() => wx.navigateBack(), 1000);
    } catch (e) {
      console.error(e);
      Toast({ context: this, selector: '#t-toast', message: '保存失败', theme: 'fail' });
    }
  }
});
