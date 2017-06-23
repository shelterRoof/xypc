jQuery(document).ready(function(){
//点击刷新	
	$('.refresh').on('click',function(){
		window.location.reload();
	})
	
	var lengtHouse=$('.houseList .listCont li').length;
	if(lengtHouse=0){
		$('.noHouse').css('display','block');
	}
//	点击筛选显示隐藏
	$('div.screeStyle > span').on('click',function(){
		$(this).siblings('ul').css('display','block');
		$(this).children('b').css('background-image','url(../images/list/icon_arrow_pre.png)');
		$(this).parent().siblings().children('ul').css('display','none');
		$(this).parent().siblings().children('span').children('b').css('background-image','url(../images/list/icon_arrow.png)');
	})
	//点击区域变化
	$('.areaPar> li').on('click',function(){
		$(this).children('ul').css('display','block');
		$(this).css('background-color','#eaebf0');
		$(this).siblings().children('ul').children('li').css('background-color','#fff')
		$(this).siblings().css('background-color','#fff');
		$(this).siblings().children('ul').css('display','none');
	})
	//点击选择地铁
	$('.stationPar li').on('click',function(){
		$(this).children('ul').css('display','block');
		$(this).css('color','#6C45AF');
		$(this).siblings().children('ul').children('li').css('color','#333')
		$(this).siblings().children('ul').css('display','none');	
		$(this).siblings().css('color','#333');		
	})
	$('.typeCont li,.towardCont li,.roomCont li').on('click',function(){
		$(this).children('b').addClass('cur') 
		$(this).siblings().children('b').removeClass('cur')
	})
//	点击清除所有进行页面刷新
	$('.screeRemove').on('click',function(){
		window.location.reload();
	})
	
//	点击二级排序
	$('.secendLeft span').on('click',function(){
		$(this).addClass('purple');
		$(this).siblings().removeClass('purple');
	})
	
	
	$('.secendRight .jumpPage button').on('click',function(){
		$(this).css('background-color','#61BAC8')
	})
	
//	根据租房类型查询房源
	
	$('.typeCont li').on('click',function(){
		$('#rentType em').html($(this).children('span').html());
		$('#rentType em').css('color','#6c45af');
		$('.type .typeCont').css('display','none');
		$('.screeRemove').css('display','block');
		$('.screenItems > div > span > b').css('background-image','url(../images/list/icon_arrow.png)')
	})
	var type=0;
	$('.type>span').on('click',function(){			
		if(type==0){
			$(this).siblings('ul.screeStyChild').stop().show();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow_pre.png)')
			type=1;
		}else{
			$(this).siblings('ul.screeStyChild').stop().hide();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow.png)')
			type=0;
		}	
	})
	
//	区域选择
	var Area=0;
	$('.area>span').on('click',function(){			
		if(Area==0){
			$(this).siblings('ul.screeStyChild').stop().show();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow_pre.png)')
			Area=1;
		}else{
			$(this).siblings('ul.screeStyChild').stop().hide();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow.png)')
			Area=0;
		}	
	})

	
//	地铁站选择
	var station=0;
	$('.station>span').on('click',function(){			
		if(station==0){
			$(this).siblings('ul.screeStyChild').stop().show();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow_pre.png)')
			station=1;
		}else{
			$(this).siblings('ul.screeStyChild').stop().hide();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow.png)')
			station=0;
		}	
	})
	$('.stationPar li').on('click',function(){
		$('.station>span>em').html($(this).html());
		$('.station>span>em').css('color','#6c45af');
		$('.station .stationPar').css('display','none');
		$('.screeRemove').css('display','block');
		$('.screenItems > div > span > b').css('background-image','url(../images/list/icon_arrow.png)')
		
	})
	
//	租金范围选择
	var rent=0;
	$('.rent>span').on('click',function(){			
		if(rent==0){
			$(this).siblings('ul.screeStyChild').stop().show();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow_pre.png)')
			rent=1;
		}else{
			$(this).siblings('ul.screeStyChild').stop().hide();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow.png)')
			rent=0;
		}	
	})
	
//	朝向选择
	$('.towardCont li').on('click',function(){
		$('.toward>span>em').html($(this).children('span').html());
		$('.toward>span>em').css('color','#6c45af');					
		$('.toward .towardCont').css('display','none');	
		$('.screeRemove').css('display','block');
	})
	
//居室查询
	var room=0;
	$('.room>span').on('click',function(){			
		if(room==0){
			$(this).siblings('ul.screeStyChild').stop().show();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow_pre.png)')
			room=1;
		}else{
			$(this).siblings('ul.screeStyChild').stop().hide();
			$(this).children('b').css('background-image','url(../images/list/icon_arrow.png)')
			room=0;
		}	
	})
	$('.roomCont li').on('click',function(){
		$('.room>span>em').html($(this).children('span').html());
		$('.room>span>em').css('color','#6c45af');							
		$('.room .roomCont').css('display','none');
		$('.screeRemove').css('display','block');
		$('.screenItems > div > span > b').css('background-image','url(../images/list/icon_arrow.png)')		
	})
	 
//	点击任意地方关闭当前页面
	$("body:not(.screeStyle)").click(function(){
		$('.screeStyChild').stop().hide();
		$('.screenItems > div > span > b').css('background-image','url(../images/list/icon_arrow.png)')		
	});
	$(".screeStyle").click(function(){
		return false;
	});
	

})