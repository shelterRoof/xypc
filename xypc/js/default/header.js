$(function() {
	var cityDom = {
		sleCity : $(".sle-city"),
		selcityBtoCon : $(".selcity-bto-con"),
		selcityBtoConLi : $(".selcity-bto-con li"),
		cityItem : $(".city-item"),
		headeNav: $(".header-nav li")
	}
	
	//移入移出城市的样式
	cityDom.sleCity.mouseenter(function(){
		cityDom.sleCity.removeClass("sle-city-leave");
		cityDom.sleCity.addClass("sle-city-hover");
	}).mouseleave(function(){
		cityDom.sleCity.removeClass("sle-city-hover");
		cityDom.sleCity.addClass("sle-city-leave");
	});
	//点击城市切换的样式
	cityDom.sleCity.click(function(event){
		if(cityDom.selcityBtoCon.css("display") == "none"){
			cityDom.selcityBtoCon.show();
			cityDom.sleCity.removeClass("sle-city-hover");
			cityDom.sleCity.addClass("sle-city-leave");
			event.stopPropagation();
		} else {
			cityDom.selcityBtoCon.hide();
			event.stopPropagation();
		}
	});
	//点击除城市区域，隐藏下拉城市
	$(document).click(function(){
		cityDom.selcityBtoCon.hide();
	});
	//点击城市，显示区域显示所选城市
	cityDom.selcityBtoConLi.click(function(){
		cityDom.cityItem.html($(this).html());
	});
	
//	//鼠标移入导航，显示出相应的下拉
	cityDom.headeNav.mouseover(function(){
		$(this).children('.border').stop();
		$(this).children('.border').animate({
			width:"60px",
		},500)
		$(this).children('.home-pulldown').animate({
			top:"80px",
		},250);
		$(this).children('.home-pulldown').show();
	}).mouseleave(function(){
		$(this).children('.border').stop();
		$(this).children('.border').animate({
			width:"0",
		},500)

	});
//	
//	//移入导航下拉框的动画
//	$(".hpd-con a").mouseover(function(){
//		$(this).stop();
//		$(this).animate({
//			paddingLeft:"30px",
//		},500);
//	}).mouseleave(function(){
//		$(this).stop();
//		$(this).animate({
//			paddingLeft:"0",
//		},500);
//	})
//
	//滚动固定导航
	$(document).scroll(function(){
		var top = $(document).scrollTop();
		if (top >= 20){
			$('.header-fe').stop();
			$('.header-fe').animate({
				paddingTop:"0px",
			},500);
		} else {
			$('.header-fe').stop();
			
			$('.header-fe').animate({
				paddingTop:"30px",
			},500);
		}
	});
	//滚动固定导航
	$(document).scroll(function(){
		var top = $(document).scrollTop();
		if (top >= 20){
			$('.header-pur').stop();
			$('.header-pur').animate({
				paddingTop:"0px",
			},500);
		} else {
			$('.header-pur').stop();			
			$('.header-pur').animate({
				paddingTop:"30px",
			},500);	
		}
	});

//	点击头部登录按钮，显示登录注册框
	$('#login').on('click',function(){
		$('.detailCover').css('display','block')
	});
	
	$('#regis').on('click',function(){
		$('.detailCover').css('display','block')
		$('.regist').addClass('present').siblings().removeClass('present');
		
		$('.inputLogWrap').css('display','none');
		$('.inputRegWrap').css('display','block');
	
	})
//	点击头部登录按钮，显示登录注册框

	
})