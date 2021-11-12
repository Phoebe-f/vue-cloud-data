import Swiper from 'swiper';

export default {
  methods: {
    // 轮播函数
    swiperFun: function (name, height, speed) {
      return new Swiper(name, {
        speed: speed,//匀速时间
        loop: true,
        autoplay: {
          delay: 0,
          // stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        direction: 'vertical',
        height: height,
        observer: true,
        observeParents: true,
        index: 0
      })
    },
    stopPlay: function (item) {
      item.stopAutoplay();
    },
    startPlay: function (item) {
      item.startAutoplay();
    },
  },
}