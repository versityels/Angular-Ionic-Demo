$(function(){
	var swiper = new Swiper('.swiper-container',{
    //autoplay:3000,
    pagination:'.swiper-pagination',
    onInit:function(swiper){
        swiperAnimateCache(swiper);
        swiperAnimate(swiper);
    },
    onSlideChangeEnd:function(){
        swiperAnimate(swiper);
    }
});
})

