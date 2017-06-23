jQuery(document).ready(function(){
	var houseId=location.search.substr(1).split("&")[0];
	var rentType=location.search.substr(1).split("&")[1];
	var roomId=location.search.substr(1).split("&")[2];
	$.ajax({
			url: "http://gj2.1zu.com/api/houseDetailJsonp?"+houseId+"&"+rentType+"&"+roomId+"",
			type:"get",
			async:false,
			dataType:"jsonp",
			jsonp:'callback',
			jsonpCallback:"successCallback",
			success:function(data){	
				if (data.success == "true"){						
						
					if(data.data.pic.length){
						$('.imgWrap .bigImg').attr('src',data.data.pic[0]);//详情大图
					}else{
						$('.imgWrap .bigImg').attr('src','../images/details/working.jpg');
						$('.smallImgWrap').css('display','none');
					}


					$("#houseInfoId").val(data.data.houseId);
					$("#roomId").val(data.data.roomId);
					$("#rentType").val(data.data.rentType);
					$("#rentPrice").val(data.data.rentPrice);
					$("#projectid").val(data.data.projectId);
					//详情小图
					var smaimg="<ul class='smallImg'>"
					
					for(var i=0;i<data.data.pic.length;i++){
						
						smaimg+="<li><img src="+data.data.pic[i]+"></li>"
					}
					smaimg+="</ul>"
					
					$('.smallImgFath').append(smaimg);
					//tab_img图片切换
					$('.smallImg li:nth-child(1) img').addClass('border');
					$(".smallImg li img").on("click", function() {
							var src = $(this).attr("src");
							$(".bigImg").attr("src", src);
							$(this).css('border','2px solid #FFFFFF');
							$(this).parent('li').siblings().children('img').css('border','none');							
						});
						
//					console.log(data.data.pic);
					//详情标题名字
					if(data.data.floorNO){
						$('.inforTitle').html(data.data.projectName+data.data.floorNO+'号楼');
					}else{
						$('.inforTitle').html(data.data.projectName);
					}
					
					$('#priceCont').html('￥'+data.data.rentPrice);//房源价格
					if(rentType=1){   //房源整租或者合租
						$('#dRentType').html('整租');
					}
					else if(rentType=2){
						$('#dRentType').html('合租');
					}	
					//朝向开始
					if(data.data.houseOrientation){
						$('#toward').html(data.data.houseOrientation);
					}else{
						$('#toward').html('--');
					}
					//朝向结束
					$('#dArea').html(data.data.space+'㎡');//面积
					//户型					
					$('#hallKit').html(data.data.fewRoom+'室'+data.data.fewHall+'厅'+data.data.fewToilet+'卫'+data.data.fewKitchen+'厨');
					//楼层
					if(data.data.floorNO&&data.data.floor){
						$('#floorTol').html(data.data.floor+'/'+data.data.floorNO+'层');
					}else if(data.data.floorNO==false||data.data.floor==true){
						$('#floorTol').html(data.data.floor);
					}else if(data.data.floor==false||data.data.floorNO==true){
						$('#floorTol').html(data.data.floorNO+'层');			
					}
					else if(data.data.floorNO==false&&data.data.floor==false){
						$('#floorTol').html('--');
					}
					//小区
					$('.inforPlot span').html(data.data.projectName);
					//位置					
						$('.inforPlace span').html(data.data.inDistrict+"-"+data.data.circle);
					//建筑年代
					if(data.data.projectYears){
						$('#projectYears').html(data.data.projectYears);
					}else{
						$('#projectYears').html('--');
					}
					
					//建筑类型	
					if(data.data.propertyType){
						$('#projecType').html(data.data.propertyType);
					}else{
						$('#projecType').html('--');
					}
					//供暖方式
					if(data.data.heating){
						$('#heating').html(data.data.heating);
					}else{
						$('#heating').html('--');
					}
					//地图
					
					var x=parseFloat(data.data.x.slice(0,3)+'.'+data.data.x.slice(3,-1)+data.data.x.slice(-1));//对字符串进行截取
					var y=parseFloat(data.data.y.slice(0,2)+'.'+data.data.y.slice(2,-1)+data.data.y.slice(-1));//对字符串进行截取
					console.log(x,y);
					var map = new BMap.Map("map");//创建百度地图实例，这里的allmap是地图容器的id  
					var navigationControl = new BMap.NavigationControl();//创建平移缩放控件  
					map.addControl(navigationControl);//添加到地图  
					var point = new BMap.Point(x, y);//创建一个点对象，这里的参数是地图上的经纬度  
				//	console.log(point)
					map.centerAndZoom(point, 20);//这里是将地图的中心移动到我们刚才创建的点；这里的12是地图的缩放界别；数值越大，地图看的越细  
					// 覆盖物标注
					var icon = new BMap.Icon('../images/details/ic_loc_me1.png', new BMap.Size(30,36), {  
						anchor: new BMap.Size(15,36)  
					});
					var mkr =new BMap.Marker(new BMap.Point(x,y), {
						icon: icon  
					});  
					map.addOverlay(mkr); 
				//  周边
					var local = new BMap.LocalSearch(map, {
					  renderOptions:{map: map, autoViewport:true}
					});
				
					$('.mapList li').on('click',function(){		
						$(this).css('color','#6c45af');
						$(this).siblings().css('color','#999');
					})
					$('#traffic').on('click',function(){
							local.searchNearby("地铁",point);							
					});
					$('#food').on('click',function(){
							local.searchNearby("餐饮",point);							
					});
					$('#shopping').on('click',function(){
							local.searchNearby("购物",point);							
					});
					$('#bank').on('click',function(){
							local.searchNearby("银行",point);							
					});
					$('#supermarket').on('click',function(){
							local.searchNearby("超市",point);							
					});
					$('#cinema').on('click',function(){
							local.searchNearby("影院",point);							
					});
				//	缩放
					function setMapEvent() {
					    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
					    map.enableKeyboard();//启用键盘上下左右键移动地图
					    map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
					    map.enableDoubleClickZoom()//启用鼠标双击放大，默认启用(可不写)
					}
				  setMapEvent();
				}
			}
	})		
});
