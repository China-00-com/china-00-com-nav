/**
 * Created by tacey on 17-7-15.
 */
//插入固定在右边的悬浮按钮
$(function() {
	//<a class="release-zb"><label></label><p>发布众包</p></a><a class="add-fixed"><label></label><p>提交</p></a>
	/*$("body").append('<div class="fixed_box"><a class="load-fixed"><label></label><p>下载</p></a><a class="official"><label></label><p>官方微信</p><div class="official_pop"><p></p><span>扫一扫体验小程序</span></div></a><a class="look_telephone"><label></label><p>手机访问</p><div class="telephone_pop"><p></p><span>扫一扫体验小程序</span></div></a><a class="to_top"><label></label></a></div>');*/
	var wWidth = $(window).width();
	var wHeight = $(window).height();
	var imgLeft = 0;
	var scrollTop = 0;
	if($(this).scrollTop() > 200) {
		$(".fixed_box .to_top").show()
	} else {
		$(".fixed_box .to_top").hide()
	}
	$(window).scroll(function() {
		scrollTop = $(this).scrollTop()
		if($(this).scrollTop() > 200) {
			$(".fixed_box .to_top").fadeIn()
		} else {
			$(".fixed_box .to_top").fadeOut()
		}
	});

	$(".fixed_box").css("bottom", "100px");
	if(wWidth < 980) {
		imgLeft = (wWidth - 980) - 140;
	} else {
		imgLeft = (wWidth - 980) / 2 - 140
	}
	$(".fixed_box").css("right", imgLeft);
	$(window).resize(function() {
		wWidth = $(window).width();
		wHeight = $(window).height();
		if(wWidth < 980) {
			imgLeft = (wWidth - 980) - 140;
		} else {
			imgLeft = (wWidth - 980) / 2 - 140;
		}
		$(".fixed_box").css("bottom", "100px")
		$(".fixed_box").css("right", imgLeft);
	})
		//二维码显示
	$(".look_telephone").hover(function() {
		$(".telephone_pop").stop(true,true).fadeIn();
	}, function() {
		$(".telephone_pop").stop(true,true).fadeOut();
	})
	$(".official").hover(function() {
		$(".official_pop").stop(true,true).fadeIn();
	}, function() {
		$(".official_pop").stop(true,true).fadeOut();
	})
	//	回到顶部
	$(".to_top").click(function() {
			$('body,html').animate({
				scrollTop: 0
			}, 200);
		})
});
$(function(){
	// 首页 banner轮播
	var k=0
	$(".banner p").hide().eq(0).show();
	$(".banner p").removeClass("active").eq(0).addClass("active");
	$(".dot span").removeClass("active").eq(0).addClass("active");
	$(".b-pre").click(function(){
		clearInterval(autoSlide)
		k--;
		if(k<0){
			k=$(".banner p").length-1;
		}
		move()
	})
	$(".b-next").click(function(){
		clearInterval(autoSlide)
		k++;
		if(k>$(".banner p").length-1){
			k=0;
		}
		move()

	})
	$(".dot span").mouseenter(function(){
		k=$(this).index()
		move()
	})
	var autoSlide=setInterval(function(){
		k++;
		if(k>$(".banner p").length-1){
			k=0;
		}
		move()
	},5000)

	$(".banner").mouseenter(function(){
		clearInterval(autoSlide)
	})
	$(".banner").mouseleave(function(){
		autoSlide=setInterval(function(){
			k++;
			if(k>$(".banner p").length-1){
				k=0;
			}
			move()
		},5000)
	})
	function move(){
		$(".banner p").fadeOut().eq(k).show();
		$(".banner p").removeClass("active").eq(k).addClass("active");
		$(".dot span").removeClass("active").eq(k).addClass("active")
	}
});

$(function(){
	//批量切换
	var page = 0;
	var pageTotal = Math.ceil($('.office-inner span').length/4);
	$('.next').click(function(){
		if( page >= pageTotal-1 )return;
		page++;
		move();
	});
	$('.pre').click(function(){
		if( page <= 0 )return;
		page--;
		move();
	});
	function move(){
		$('.office-inner').stop().animate({
			left: -(page * $('.office-wrapper').width() + 12)
		}, 500);
	}

	//大图查看
	var index = 0;
	$('.office-inner span').click(function(){
		index = $(this).attr('index');
		$('.lightbox-inner img').attr('src', ($('.office-inner span').eq(index).find('img').attr('src')));
		$('.office-lightbox').fadeIn();
	});
	$('.office-lightbox .left').click(function(){
		if( index <= 0 )return;
		index--;
		changeSrc();
	});
	$('.office-lightbox .right').click(function(){
		if( index >= $('.office-inner span').length-1 )return;
		index++;
		changeSrc();
	});
	function changeSrc(){
		$('.lightbox-inner img').attr('src', ($('.office-inner span').eq(index).find('img').attr('src')));
	}
	$('.office-lightbox').click(function(e){
		if($(e.target).hasClass('office-lightbox')){
			$('.office-lightbox').fadeOut();
		};
	});
	$('.office-lightbox .close').click(function(){
		$('.office-lightbox').fadeOut();
	});

	footFix();
});

//分享
function _jiathis() {
	var wWidth = $(window).width();
	var wHeight = $(window).height();
	if (wWidth < 1160) {
		$('.jiashare').hide();
	} else {
		$('.jiashare').css('left', Math.floor((wWidth - 1000)/2) - 120 + 'px').show();
	}
}

//底部菜单
function footFix(){
	if( $('.main-wrapper').outerHeight() < $(window).height() - $('.nav-wrapper').height() - $('.foot-wrapper').outerHeight() - 60 ){
		$('.foot-wrapper').css({
			'width': '100%',
			'position': 'fixed',
			'bottom': 0,
			'left': 0,
			'z-index': 100
		});
	}else{
		$('.foot-wrapper').removeAttr('style');
	}
}

//处理图片的宽高
function setImgWH(obj) {
	if(obj.width > obj.height) {
		$(obj).css('height', '100%');
	} else {
		$(obj).css('width', '100%');
	}
}

$(function() {
	//弹窗
	var H_ture = $(".switchbox .content").height();
	var flag = true;
	if(H_ture > 36) {
		$(".switchbox .content").css("height", "36px")
		$(".slideBtn a").click(function() {
			if(flag) {
				$(".switchbox .content").animate({
					"height": H_ture
				})
				$(this).addClass("active")
			} else {
				$(".switchbox .content").animate({
					"height": "36px"
				})
				$(this).removeClass("active")
			}
			flag = !flag;
		})
	}
	//			点击标签的效果
	$(".switchbox .content a").click(function() {
		$(".switchbox .content a").removeClass("active")
		$(this).addClass("active")
	})
});
/*------------↓-------------2017-05-02 以后------------↓-------------*/