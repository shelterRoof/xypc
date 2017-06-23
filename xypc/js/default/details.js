$(function(){
	//tab_img图片切换
	$(".smallImg li img").on("click", function() {
		var src = $(this).attr("src");
		$(".bigImg").attr("src", src);
	});
	//小图片点击时
	var index=0;		
	$('#smallRight').click(function(){		
		var l=$('.smallImg li').length;
		console.log(l)
		index++;
		if(index>l-5){	
			index=0;
		}
		var len=-110*(index);
		$('.smallImg').stop().animate({ "left": "" + len + "px"}, 500)
	});		
	
	$('#smallLeft').click(function(){	
			var l=$('.smallImg li').length;
			index--;
			if(l<=5){
				
				if(index<0){
					index=0;
				}
			}
			else{
				console.log("1")
				if (index < 0) {
            index = l-5;
        }
			}
   	 var len=-110*index;
        $(".smallImg").stop().animate({"left": "" + len + "px"

          }, 500)
		});
	
	//预约看房
	
//	点击男士/女士
	$('.orderGender b').on('click',function(){
		$(this).addClass('pitchon').siblings().removeClass('pitchon');
	})
//	登录
	
//	注册
	$('.regist').on('click',function(){
		$('.inputLogWrap,.inputResWrap,.resetPassword').css('display','none');
		$('.inputRegWrap').css('display','block');
		$(this).addClass('present').siblings().removeClass('present');		
	})
//	登录
	$('.login').on('click',function(){
		$('.inputRegWrap,.inputResWrap,.resetPassword').css('display','none');
		$('.inputLogWrap').css('display','block');
		$(this).addClass('present').siblings().removeClass('present');		
	})	
//	重置
	$('.forgotPassword').on('click',function(){
		$('.inputRegWrap,.inputLogWrap,.login,.regist').css('display','none');
		$('.inputResWrap,.resetPassword').css('display','block');
	})

//	填写约看信息
	$('.writeInfor').on('click',function(){
		$(this).addClass('present').siblings().removeClass('present');
		$('.writeWrap').css('display','block');
		$('.checkSee').css('display','none');
	})
		$('.lookSwitch').on('click',function(){
		$(this).addClass('present').siblings().removeClass('present');
		$('.checkSee').css('display','block');
		$('.writeWrap').css('display','none');
	})
//点击任意灰色区域遮罩层消失
		$(".detailCover:not(.loSinWrap,.orderWrap)").click(function(){
			$('.detailCover').stop().hide();
			$('#coo').remove();
		});

		$('.loSinWrap,.orderWrap').on('click',function(){
			return false;
		})
	//手机号判断	
		var re_phone = /^1[3|4|5|7|8]\d{9}$/;
		var  passWord=/(?=.*\d)(?=.*[A-z])^[0-9A-z]{8,}$/;		
		$('.loginBtn').on('click',function(){			
			if($("#loginPhone").val() == ""){
				alert('请输入手机号！');
			} else if(!re_phone.test($("#loginPhone").val())) {
				alert('手机号码不正确，请重新输入！');
			} else if(!passWord.test($("#loginPassword").val())){
				alert('密码不正确，请重新输入！');
			}else{
				$(".detailCover").css('display','none');
				$('.headLoginWrap .notLogin').css('display','none');
				$('.headLoginWrap .alreadyLogin').css('display','block');
			}			
		})
		
		//重置
		$('.resLoginBtn').on('click',function(){
			if($("#resPhone").val() == ""){
				alert('请输入手机号！');
			} else if(!re_phone.test($("#resPhone").val())) {
				alert('手机号码不正确，请重新输入！');
			} else if(!passWord.test($("#resPassword").val())){
				alert('密码不正确，请重新输入！');
			}else{
				$(".detailCover").css('display','none');
				$('.headLoginWrap .notLogin').css('display','none');
				$('.headLoginWrap .alreadyLogin').css('display','block');
			}	
		})
		
		//注册
		$('.registBtn').on('click',function(){
			if($("#regPhone").val() == ""){
				alert('请输入手机号！');
			} else if(!re_phone.test($("#regPhone").val())) {
				alert('手机号码不正确，请重新输入！');
			} else if(!passWord.test($("#regPassword").val())){
				alert('密码不正确，请重新输入！');
			}else{
				$(".detailCover").css('display','none');
				$('.headLoginWrap .notLogin').css('display','none');
				$('.headLoginWrap .alreadyLogin').css('display','block');
			}	
		})
		//预约看房
		$('.make').on('click',function(){
			$('.loSinWrap').css('display','none');
			$('.orderWrap,.detailCover').css('display','block');
		})
		
		//点击上午/下午
			var judge=0;
		$('.afterChice').on('click',function(){
			if(judge==0){
				$('.choceTime').css('display','block');
				$('.afterChice').css('background-image','url(../images/details/icon_arrow.png)');
				judge=1;
			}else{
				$('.choceTime').css('display','none');
				$('.afterChice').css('background-image','url(../images/details/icon_arrow_pre.png)');
				judge=0;
			}
		})
		
		
		$('.choceTime ul li').on('click',function(){
			$('.afterChice').html($(this).html());
			$(this).css('background-color','#f4f5f9');
			$(this).siblings().css('background-color','#fff');			
			$('.choceTime').css('display','none');			
			$('.afterChice').css('background-image','url(../images/details/icon_arrow_pre.png)');
		})	
//		提示弹框
		function hint(orderContent){
			$('.orderReminder').stop().show().delay(3000).fadeOut();
			$('.orderReminder').html(orderContent);
		}
//		手机号/姓名/时间都为空时,弹出框的提示内容
		$('.subBtnOrder').on('click',function(){
			if($('#orderUsername').val()==""||$('#orderPhone').val()==""||$('.week').html()==""||$('.afterChice').html()==""){
				hint('请将您的信息填写完整');
			}else{
				//提交约看请求到后台
				$("#appointmentTime").val($('.week').html().split("&nbsp;")[2]);
				$("#appointmentAmpm").val($('.afterChice').html());
				$.ajax({
					type: 'post',
					dataType:'json', 
					crossDomain: true,
					url: "http://localhost:8080/appointment/applySubmitgw.htm",
					data : $("#doform").serialize(),       
					success: function(data){ 
					if(data.success==true){
						hint("您已成功提交看房预约");
					}else{
						hint(data.erroMsg);
					}  
					},
					error:function(XMLHttpRequest, textStatus, errorThrown) {
//					   alert(XMLHttpRequest.status);
//					   alert(XMLHttpRequest.readyState);
//					   alert(textStatus);
					   alert("ajax req error!")
					 }
				});
			
			}			
		})



function selectSex(x){	
	if(x=='1'){
		$("#tenantSex").val("10100010001");	
	}else{
		$("#tenantSex").val("10100010002");	
	}
	
}
//		时间
function getAfter(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
            if(mon>1) {
               mon=mon-1;
            }
           else {
             year = year-1;
             mon = 12;
             }
           }
          d.setDate(d.getDate()-n);
          year = d.getFullYear();
          mon=d.getMonth()+1;
          day=d.getDate();
     s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
     return s;
}

function getAfterDate(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
            if(mon>1) {
               mon=mon-1;
            }
           else {
             year = year-1;
             mon = 12;
             }
           }
          d.setDate(d.getDate()-n);
          year = d.getFullYear();
          mon=d.getMonth()+1;
          day=d.getDate();
     s = (mon<10?(mon):mon)+"月"+(day<10?('0'+day):day)+"号";
     return s;
}
		var weekToday=["今天","明天","后天","","","",""];
			var gh=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
			var timeAfter='<ul>'
			var cWeek=$('.weekDay').html();
			for(var i=0;i<7;i++){			
				timeAfter+='<li><h3>'+weekToday[i]+'</h3><h6>'+getAfterDate(-i)+'</h6><h5 class="weekDay">'+gh[i]+'</h5></li>';				
			}
			timeAfter+='</ul>';
			$('.week').html(weekToday[0]+'&nbsp;&nbsp;'+getAfterDate(0)+'&nbsp;&nbsp;'+gh[0]);		
			$('.dateTime').append(timeAfter);
			
		var judgeWeek=0;	
		$('.week').on('click',function(){
			if(judgeWeek==0){
				$('.dateTime').css('display','block');
				$('.week').css('background-image','url(../images/details/icon_arrow.png)');
				judgeWeek=1;
			}else{
				$('.dateTime').css('display','none');
				$('.week').css('background-image','url(../images/details/icon_arrow_pre.png)');
				judgeWeek=0;
			}
			
		})
		
		$('.dateTime ul li').on('click',function(){
			$('.week').html($(this).children('h3').html()+'&nbsp;&nbsp;'+$(this).children('h6').html()+'&nbsp;&nbsp;'+$(this).children('h5').html());
			$(this).css('background-color','#f4f5f9');
			$(this).siblings().css('background-color','#fff');		
			$('.dateTime').css('display','none');			
			$('.week').css('background-image','url(../images/details/icon_arrow_pre.png)');
			judgeWeek=0;
		})	
		
		
		
		
	})
