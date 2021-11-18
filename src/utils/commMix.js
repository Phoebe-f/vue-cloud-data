import Swiper from 'swiper';

export default {
  methods: {
    // 轮播函数
    swiperFun: function (name, height, speed) {
      return new Swiper(name, {
        initialSlide: 0,
        slidesPerView: 'auto',
        // loopedSlides :12,
        speed: speed,//匀速时间
        autoplay: {
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        direction: 'vertical',
        observer: true,
        autoHeight:true,
        observeParents: true,
        loop: true,
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