Component({
  properties: {
    imgUrl: {
      type: String,
      value: 'https://tdesign.gtimg.com/miniprogram/template/retail/template/empty-cart.png',
    },
    tip: {
      type: String,
      value: '预定单是空的',
    },
    btnText: {
      type: String,
      value: '去浏览',
    },
  },
  data: {},
  methods: {
    handleClick() {
      this.triggerEvent('handleClick');
    },
  },
});
