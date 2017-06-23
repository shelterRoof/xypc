jQuery(document).ready(function(){
	var mydata={
		pageNum:1,
		rentType:"",
		minPrice:"",
		maxPrice:"",
		houseType:"",		
		inDistrict:"",
		businessCircleId:""	,
		subwayLines:"",
		subwayStations:"",
		searchStr:"",
		front : 1,		
		after : ''	
	};
	
	var url='http://gj2.1zu.com/api/houseListJsonp';
		searchData(url,mydata);
//	封装待租房源函数开始
	function searchData(urlAjax,dataAjax){
    	$.ajax({
		url: urlAjax,
		type: "get",
		async: false,
		dataType: "jsonp",
		jsonp:'callback',
		jsonpCallback:"successCallback",
		data:dataAjax,
		success: function (json) {
			mydata.after = json.totalPageCount;
			mydata.front = parseInt($('.front').html());
			
			console.log(mydata.after);
			console.log(mydata.front);
			console.log(mydata);
			if (json.success == "true") {
				$('.after').html(mydata.after);
				$('.houseList .listCont').remove();
				var data=json.data;				
//				开始动态创建房源
				var houseList='<ul class="listCont">'				
				for(var i=0;i<data.length;i++){										
					var sp="";
					for(var j=0;j<data[i].tabList.length;j++)
					{
						sp+='<span>'+data[i].tabList[j]+'</span>'
						
					}						
					houseList+='<li><img src='+data[i].fmpic+'><div class="houseInfor"><p class="roomid">'+data[i].roomsID+'</p><p class="typeRent">'+data[i].rentType+'</p><p class="houseid">'+data[i].houseId+'</p><p>'+data[i].projectName+'</p><h2><b>￥</b><span>'+data[i].rentPrice+'</span>&nbsp;月</h2><h3><b>'+data[i].space+'<b>㎡</b></b> | <b>'+data[i].fewRoom+'<b>室</b>'+data[i].fewHall+'<b>厅</b></b> | <b>'+
					data[i].rientationName +'</b> </h3><div class="condition">'+sp+'</div></div></li>'	
	
					if(data[i].fmpic=="http://image.5i5j.com/images/defaultPic/defaultFMT.jpg"){
						$('.listCont li img').attr("src","../images/list/working.png");
						data[i].fmpic="../images/list/working.png";
					}
				}
				houseList+='</ul>'					
				$('.houseList').append(houseList);
//				结束动态创建房源
				var lengtHouse=$('.houseList .listCont li').length;
				var lengthAfter=$('.after').html();
				console.log(lengtHouse);
//				判断房源如果为空就把该字段还原
					if(lengtHouse>0){
						$('.noHouse').css('display','none');
					}else if(lengthAfter==0){
						$('.noHouse').css('display','block');						
					}
					
				if(mydata.subwayLines==""||mydata.subwayStations==""){
								$('.station span em').html('地铁站');
								$('.station span em').css('color','#333')							
					}
				if(mydata.businessCircleId==""||mydata.inDistrict==""){
								$('.area span em').html('区域选择');
								$('.area span em').css('color','#333')
				}	
				
				if(mydata.rentType==""){
					$('#rentType em').html('租房类型').css('color','#333');
				}
				if(mydata.minPrice==""||mydata.maxPrice==""){
					$('.rent span em').html('租金范围').css('color','#333');
				}
				if(mydata.houseType==""){
					$('.room span em').html('居室').css('color','#333');
				}	
				if(mydata.searchStr==""){
					$('#searchInput').val('');
				}
//				点击房源,传递参数到详情页面
				$('.listCont li').on('click',function(){
					var roomId=$(this).children("div").children('.roomid').html();
					var rentType=$(this).children("div").children('.typeRent').html();
					var houseId=$(this).children("div").children('.houseid').html();				
					console.log(rentType);
					//跳转到详情		
					window.open("details.shtml?houseId="+houseId+"&rentType="+rentType+"&roomId="+roomId+"");			
				})					
			}else{
				alert(json.errorMsg);
			}
		},
		error: function(xhr){
			$('.noNetwork').css('display','block');
			
		}
	});
    }
	//封装待租房源结束

//	点击显示上一页/下一页
				$(".arrowRight").on("click",function () {
					
					console.log(mydata.after);
					console.log(mydata.front);
					
					if (mydata.front >= mydata.after) 
					{
						console.log(mydata.after)
						mydata.front = mydata.after;
						console.log("当前已经是最后一页！");
					}
					else if(mydata.front < mydata.after)
					{
						
						console.log("wodianjiel xiayiye ")
						mydata.front ++;						
						mydata.pageNum = mydata.front;
						$('.front').html(mydata.front);
						$('.jumpPage .pageNum').val(mydata.front);
					}	
					
					searchData(url,mydata);
					
				});
				//上一页
				$(".arrowLeft").on("click",function () {
					if (mydata.front <2) 
					{
						mydata.front = 1;
						console.log("当前已经是第一页！");
					}
					else
					{
						mydata.front --;						
						mydata.pageNum = mydata.front;	
						console.log(mydata.pageNum );
						$('.front').html(mydata.front);
						$('.jumpPage .pageNum').val(mydata.front);
						
					}						
					searchData(url,mydata);
							
				});
//				跳转								
				$(".jumpPage .pageButton").on("click",function () {
//					
					mydata.front = parseInt($(".jumpPage .pageNum").val());					
					console.log(mydata.front);
					if (mydata.front < 2 && mydata.front > after) 
					{
						mydata.front = 1;
						$('.front').html(mydata.front);
						console.log("返回首页！");
					}
					else
					{			
						mydata.pageNum = mydata.front;
						console.log(mydata.pageNum)
						$('.front').html(mydata.front);
					}	
					
					searchData(url,mydata);			
				});	
				
//地铁线路
	$.ajax({	
        url:"http://gj2.1zu.com/api/subway/getSubWayInfoJsonp",
        type: "get",
        dataType: "jsonp",
        jsonp:"callback",
        jsonpCallback:"successCallback",
        success:function(data) {

             if (data.success == "true"){

             	console.log(data.data)
             	
             	var stationData=data.data.lineList;
             	
           		console.log(stationData.length)
           		
          		var stationInfor='<ul class="stationPar screeStyChild"><li class="arr noLimit">不限<b></b></li>'         						
				for(var i=0; i<stationData.length; i++){					
					var stationChild='<ul>';	
				   for (var j=0;j<stationData[i].stationList.length;j++) {				   	  				   
						stationChild+='<li id='+stationData[i].stationList[j].id+'>'+stationData[i].stationList[j].stationName+'</li>'												
					}
				 	 stationChild+= '</ul>'
				  	stationInfor+='<li id='+stationData[i].id+'>'+stationData[i].lineName+'<b></b>'+stationChild+'</li>'			   
				}
				stationInfor+='</ul>'
				$('.station').append(stationInfor);		
				 $('.stationPar>li').on('click',function(){
			     	$(this).children('ul').css('display','block');
					$(this).css('color','#6C45AF');
					$(this).siblings().css('color','#333');
					$(this).siblings().children('ul').css('display','none');					
     		})
				 $('.stationPar li.noLimit').on('click',function(){
				     	$('.stationPar').css('display','none');
				     	$('.screeRemove').css('display','block');
						$('.station span em').html($(this).html());
						$('.station>span>em').css('color','#6c45af');	
						$(this).css('color','#6C45AF')						
							mydata.subwayLines="";
							mydata.subwayStations="";
							searchData(url,mydata);
						$('.station > span > b').css('background-image','url(../images/list/icon_arrow.png)')														     								
				 })			
		//点击之后的样式
		//点击地铁搜索房源   		 				 
				  $('.stationPar>li>ul>li').on('click',function(){
				     	$('.stationPar').css('display','none');
						$('.station span em').html($(this).html());
						$('.station span em').css('color','#6C45AF');
						$('.screeRemove').css('display','block');
						$(this).siblings().children('ul').css('display','none');						
						$('.station > div > span > b').css('background-image','url(../images/list/icon_arrow.png)')											
						var stationIn=$(this).attr("id");
						var fatherId=$(this).parent('ul').parent('li').attr("id");
						console.log(fatherId)
						console.log(stationIn)						
						mydata.subwayStations=stationIn;//获取商圈id
						mydata.subwayLines=fatherId;//获取区域id					
						mydata.businessCircleId="";
						mydata.inDistrict="";
						mydata.pageNum=1;
						mydata.front = 1;
						mydata.front=parseInt($('.front').html(1));
						mydata.searchStr="";
						searchData(url,mydata);
					    })				  
				  
             } else {
                 alert(json.errorMsg);
             }
         },
         error: function(xhr){
			$('.noNetwork').css('display','block');
             
         }
     
});

//	区域展示
	$.ajax({
        url:"http://gj2.1zu.com/api/getCircleJsonp",
        type: "get",
        dataType: "jsonp",
        jsonp:'callback',
        jsonpCallback:"successCallback",
        success:function(json){
             if (json.success == "true") {
             	console.log(json.data)         	
             	var areaData=json.data.children;
          		var areaInfor='<ul class="areaPar screeStyChild"><li class="arr limit">不限<b></b></li>'     	
				for(var i=0;i<areaData.length;i++){
					var areaChild='<ul>';
				   for (var j=0;j<areaData[i].children.length;j++) {
				   	  				   
						areaChild+='<li id='+areaData[i].children[j].id+'>'+areaData[i].children[j].text+'</li>'												
					}
				 	 areaChild+= '</ul>'
				  	areaInfor+='<li id='+areaData[i].id+'>'+areaData[i].text+'<b></b>'+areaChild+'</li>'			   
				}
				areaInfor+='</ul>'
				$('.area').append(areaInfor);		
				 $('.areaPar>li').on('click',function(){
			     	$(this).children('ul').css('display','block');
					$(this).css({'background-color':'#eaebf0','color':'#6C45AF'});
					$(this).siblings().css({'background-color':'#fff','color':'#3d3d3d'});
					$(this).siblings().children('ul').css('display','none');					
     			})
				 $('.areaPar li.limit').on('click',function(){
				     	$('.areaPar').css('display','none');
				     	$('.screeRemove').css('display','block');
						$('.area span em').html($(this).html());
						$('.area>span>em').css('color','#6c45af');	
						$(this).css('color','#6C45AF')			     		
			     			mydata.businessCircleId="";
							mydata.inDistrict="";
							searchData(url,mydata);		     		
				 })				 				
		//点击之后的样式
		//点击区域搜索房源   		 				 
				  $('.areaPar>li>ul>li').on('click',function(){
				     	$('.areaPar').css('display','none');
				     	$('.screeRemove').css('display','block');
						$('.area span em').html($(this).html());
						$('.area>span>em').css('color','#6c45af');	
						$(this).css('color','#6C45AF')
						$(this).siblings().css('color','#3d3d3d')						
						$(this).siblings().children('ul').css('display','none');
						$('.screenItems > div > span > b').css('background-image','url(../images/list/icon_arrow.png)')						
						var areaIn=$(this).attr("id");
						var fatherId=$(this).parent('ul').parent('li').attr("id");
						console.log(fatherId)
						console.log(areaIn)						
						mydata.businessCircleId=areaIn;//获取商圈id
						mydata.inDistrict=fatherId;//获取区域id	
						mydata.subwayLines="";
						mydata.subwayStations="";
						mydata.pageNum=1;
						mydata.front = 1;
						mydata.front=parseInt($('.front').html(1)); 
						mydata.searchStr="";
						searchData(url,mydata);						
					})
             } else {
                 alert(json.errorMsg);
             }
         },
         error: function(xhr){
			$('.noNetwork').css('display','block');
             
         }
     });

    
// 点击租房类型      
    if($('#rentType em').html()=='租房类型'){

  	 var na=$('#rentType em').html();
    	
    	$('.typeCont li').on('click',function(){
    		
     	var joinRen=$(this).children('span').html();    
	     	if(joinRen=='合租'){
	     		mydata.rentType = 2;

	     		$('.typeCont li').on('click',function(){

			     	if(joinRen==na){		     		
			     		window.location.reload();
			     	}
		     	});
	     	}else if(joinRen=='整租' ){
	     		mydata.rentType = 1;	     			     		
	     		$('.typeCont li').on('click',function(){   	
			     	if(joinRen==na){
			     		window.location.reload();
			     	}
		     	});	     		
	     	}
	     	mydata.pageNum=1;
			mydata.front = 1;
			mydata.front=parseInt($('.front').html(1)); 
			mydata.searchStr="";
			searchData(url,mydata);
//	     	searchData(); 
    	})
    	
    }

//  点击租金范围进行搜索
     $('.rentCont button').on('click',function(){
		var val1=$('.rentFir').val();
		var val2=$('.rentSec').val();
		mydata.minPrice=$('.rentFir').val();
     	mydata.maxPrice=$('.rentSec').val();
		var tru= /^\d+$/;
		if(val1==''||val2==''){
			$('.rentCont').css('display','none');
			$('.rent>span>b').css('background-image','url(../images/list/icon_arrow.png)')
		}else if(!tru.test(val1)||!tru.test(val2)){
			$('.rentCont').css('display','none');
			$('.rent>span>b').css('background-image','url(../images/list/icon_arrow.png)')
		}else{
			$('.screeRemove').css('display','block');
			$('.rent>span>em').html('￥'+val1+'-￥'+val2);			
			$('.rent>span>em').css('color','#6c45af');			
			$('.rent .rentCont').css('display','none');	
			$('.screenItems > div > span > b').css('background-image','url(../images/list/icon_arrow.png)')
			mydata.pageNum=1;
			mydata.front = 1;
			mydata.front=parseInt($('.front').html(1)); 
			mydata.searchStr="";
			searchData(url,mydata);
//			searchData();
		}
		
	})	

//点击居室
	var nome=$('.room>span>em').html();
	$('.roomCont li').on('click',function(){
		var houseNum=$(this).children('span').html();
		if(houseNum=='1居'){
			mydata.houseType=0;
			$('.roomCont li').on('click',function(){
				if(houseNum==nome){
					window.location.reload();
					
				}
			})
		}else if(houseNum=='2居'){
			mydata.houseType=1;
			$('.roomCont li').on('click',function(){
				if(houseNum==nome){
					window.location.reload();
				}
			})
		}else if(houseNum=='3居'){
			mydata.houseType=2;
			$('.roomCont li').on('click',function(){
				if(houseNum==nome){
					window.location.reload();
				}
			})
		}else if(houseNum=='更多'){
			mydata.houseType=3;
			$('.roomCont li').on('click',function(){
				if(houseNum==nome){
					window.location.reload();
				}
			})
		}
		console.log(houseNum);
		mydata.pageNum=1;
		mydata.front = 1;
		mydata.front=parseInt($('.front').html(1)); 
		mydata.searchStr="";
		searchData(url,mydata);	
	})   
     

     
     //价格排序    
     	var price=0;
     	var sarea=0;
     $('#screePrice').on('click',function(){ 
     	sarea=0;
     	if(price == 0)
     		{      						
			mydata.orderByType="priceDESC";
			$('#screePrice').html('面积排序');
			$('#screePrice').html('价格升序')
			mydata.pageNum=1;
			mydata.front = 1;
			mydata.front=parseInt($('.front').html(1)); 
			mydata.searchStr="";
			searchData(url,mydata);
     		price = 1;				     					
     	}
	     	else			
	     	{	
				$('#screePrice').html('价格降序')	  
				mydata.orderByType="priceASC";
				mydata.pageNum=1;
				mydata.front = 1;
				mydata.front=parseInt($('.front').html(1)); 
				mydata.searchStr="";
				searchData(url,mydata);	     		
	     		price = 0;					     		
			}   	
     })
//  面积排序
	$('#screeArea').on('click',function(){
		price=0;
		if(sarea == 0){
			mydata.orderByType="areaDESC";
			$('#screePrice').html('价格排序');
			$('#screeArea').html('面积升序');
			mydata.pageNum=1;
			mydata.front = 1;
			mydata.front=parseInt($('.front').html(1)); 
			mydata.searchStr="";
			searchData(url,mydata);
				sarea = 1;
		}else{
			$('#screeArea').html('面积降序');	
			mydata.orderByType="areaASC";
			mydata.pageNum=1;
			mydata.front = 1;
			mydata.front=parseInt($('.front').html(1)); 
			mydata.searchStr="";
			searchData(url,mydata);
			sarea = 0;
		}							
	})
//	默认排序
	$('#defaultSort').on('click',function(){
		$('#screeArea').html('面积排序');
		$('#screePrice').html('价格排序');
		mydata.pageNum=1;
		mydata.front = 1;
		mydata.front=parseInt($('.front').html(1));
		mydata.searchStr="";
		searchData(url,mydata);
	})	
//	搜索框
	$('#searchBtn').on('click',function(){
		var searchInput=$('#searchInput').val();
		mydata.searchStr=searchInput;
		mydata.pageNum=1;
		mydata.front = 1;
		mydata.front=parseInt($('.front').html(1)); 
		searchData(url,mydata);
		mydata.rentType="";
		mydata.minPrice="";
		mydata.maxPrice="";
		mydata.inDistrict="";
		mydata.businessCircleId="";
		mydata.subwayLines="";
		mydata.subwayStations="";		
		console.log(searchInput);	
	})
	
		$(document).keyup(function(event){ 
			if(event.keyCode ==13){ 
				$("#searchBtn").trigger("click"); 
				console.log('222')
			} 
		});

});
