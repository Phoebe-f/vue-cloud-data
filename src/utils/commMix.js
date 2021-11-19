import Swiper from 'swiper';

export default {
  methods: {
    // 轮播函数
    swiperFun: function (name, height, speed) {
      return new Swiper(name, {
        initialSlide: 0,
        slidesPerView: 'auto',
        speed: speed,//匀速时间
        autoplay: {
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        direction: 'vertical',
        autoHeight: true,
        height: height,
        observer: true,
        observeParents: true,
        loop: true,
        spaceBetween:1,
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