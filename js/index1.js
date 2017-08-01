//var  swiper;
var m1 = angular.module("mainApp",['ionic','ngAnimate']);
 m1.config(["$stateProvider",function($stateProvider){
	$stateProvider.state("homepage",{
		url:"/homepage",
		templateUrl:"homepage.html",
		controller:"homepage"
	}).state("sort",{
		url:"/sort",
		templateUrl:"sort.html",
		controller:"sort"
	}).state("summer",{
		url:"/homepage/summer/:name/:num",
		templateUrl:"summer.html",
		controller:"summer"
	}).state("yuding",{
		url:"/homepage/summer/yuding",
		templateUrl:"yuding.html",
		controller:"yuding"
	}).state("guanzhu",{
		url:"/guanzhu",
		templateUrl:"guanzhu.html",
		controller:"guanzhu"
	}).state("coffee",{
		url:"/homepage/coffee/:num",
		templateUrl:"coffee.html",
		controller:"coffee"
	}).state("register",{
		url:"/homepage/register",
		templateUrl:"register.html",
		controller:"mine"
	}).state("login",{
		url:"/homepage/login",
		templateUrl:"login.html",
		controller:"mine"
	}).state("mine",{
		url:"/homepage/mine",
		templateUrl:"mine.html",
		controller:"mine"
	})
}])
  
  m1.controller("sort",["$scope","$state","$http","$stateParams",function($scope,$state,$http,$stateParams){
	
	$scope.dataList = [
	{"src":"../images/sort/sort_1.png","name":"最爱中国菜","num":"0"},
	{"src":"../images/sort/sort_2.png","name":"主题餐厅","num":"1"},
	{"src":"../images/sort/sort_3.png","name":"咖啡与茶","num":"2"},
	{"src":"../images/sort/sort_4.png","name":"糖果点心","num":"3"},
	{"src":"../images/sort/sort_5.png","name":"激情火锅","num":"4"},
	{"src":"../images/sort/sort_6.png","name":"韩国料理","num":"5"},
	{"src":"../images/sort/sort_7.png","name":"日本料理","num":"6"},
	{"src":"../images/sort/sort_8.png","name":"特色菜","num":"7"},
	{"src":"../images/sort/sort_9.png","name":"美味快餐","num":"8"},
	{"src":"../images/sort/sort_10.png","name":"自助餐来啦","num":"9"}
	];
	
	$scope.trade = function($index){
		//console.log($index);
		var num = $index;
		$http({
			method:"get",
			url:"../js/data.json",
			params:{"num":num}
		}).success(function(data){
			//console.log(num);
			//console.log(data.sort[num].food);
			$scope.foodList = data.sort[num].food;
		})
	}
	$scope.trade(0);
	
	$scope.val = "";
	$scope.search = function(){
		$http({
			method:"JSONP",
			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$scope.val+"&cb=JSON_CALLBACK"
		}).success(function(data){
			$scope.seaList = data;
			//console.log($scope.seaList);
		})
	}
}])
  
 m1.controller("demo",function($state,$http,$scope){
	$state.go("homepage");
	$scope.goMe = function(){
		var data = localStorage.getItem("user");
//		console.log(data);
		if(data&&data!=""){
			$state.go("mine");
		}else{
			$state.go("login");
		}
	}
})
 m1.controller("homepage",["$scope","$timeout",function($scope,$timeout){
$scope.head="城空绿野仙踪";
	$scope.start="START";
	$scope.food="美味佳肴  任你挑选";
	$scope.topsrc=[
		{"src":"../images/homepage/li1.png","name":"热门排行"},
		{"src":"../images/homepage/li2.png","name":"本周特惠"},
		{"src":"../images/homepage/li3.png","name":"附近店铺"},];
	$scope.foursrc=[
	{"src":"../images/homepage/four1.jpg","name":"浪漫约会","cont":"心动的瞬间"},
	{"src":"../images/homepage/four2.jpg","name":"休闲时光","cont":"来放松一下"},
	{"src":"../images/homepage/four3.jpg","name":"商务洽谈","cont":"尽显高大上"},
	{"src":"../images/homepage/four4.jpg","name":"家庭聚餐","cont":"温馨的一家"},];
	$scope.hot="热门话题";
	$scope.hotsrc=[
		{"src":"../images/homepage/hot1.jpg","h61":"夏日酷爽","h62":"清凉一夏","class":"span1","num":"0"},
		{"src":"../images/homepage/hot2.jpg","h61":"甜品诱惑","h62":"恬美生活","class":"span2","num":"1"},
		{"src":"../images/homepage/hot4.jpg","h61":"海鲜来袭","h62":"深海味道","class":"span4","num":"2"},
		{"src":"../images/homepage/hot3.jpg","h61":"火辣烧烤","h62":"热不可挡","class":"span3","num":"3"},
		
		];
	$scope.like="猜你喜欢";
	$scope.likesrc=[
		{"src":"../images/homepage/like1.jpg","name":"最具颜值的精致西餐厅"},
		{"src":"../images/homepage/like2.jpg","name":"古色古香忆流水"},
		{"src":"../images/homepage/like3.jpg","name":"动漫茶餐厅"},
		{"src":"../images/homepage/like4.jpg","name":"豪华自助 奢侈享受"},]
	$timeout(function(){
		 var swiper = new Swiper("#swiper",{
		loop:true,
		centeredSlides:true,
		watchSlidesProgress:true,
		slidesPerView:'auto',
		onProgress:function(swiper){
			for(var i =0;i<swiper.slides.length;i++){
				var slide = swiper.slides[i];
				var progress = slide.progress;
				es = slide.style;
				es.opacity=1-Math.min(Math.abs(progress/3),1);
				es.webkitTransform=es.transform ="translate3d(0,0,"+(-Math.abs(progress*150))+"px)";
			}	
		}
		 })
		 var swiper = new Swiper("#swiper1",{
		loop:true,
		autoplay:3000,
		speed:1000
	})
	},500)
	
	
//	swip()
//	swip("#swiper1")
}])
 
 m1.controller("summer",function($state,$http,$scope,$stateParams){
// 	console.log($stateParams)
   	$scope.name=$stateParams.name;
 	$http({
		method:"get",
		url:"../json/summer.json",
	}).success(function(data){
		$scope.leftsrc = data.summer[$stateParams.num].left;
		$scope.rightsrc = data.summer[$stateParams.num].right;
	})
 })
  m1.controller("yuding",function($state,$http,$scope,$stateParams){
// 	console.log($stateParams)
   	$scope.yuname="研磨时光";
   	$scope.where="紫荆山";
   	$scope.which="咖啡甜点"
   	$scope.money="¥60/人";
   	$scope.time="10:00-22:00";
   	$scope.allwhere="经六路282-2号";
   	$scope.phone='0371-67066031';
	$scope.why="无论你想独处享受难得的安静,还是约上好友体验悠闲时光,这里都是你的一个好的选择."
	$scope.num=1;
	$http({
		method:"get",
		url:"../json/yuding.json",
	}).success(function(data){
//		console.log(data)
		$scope.caidansrc=data.caidan
	})
	$scope.isshow=false;
	$scope.yudinga=function(){
//		alert($scope.isshow)
		if($scope.isshow){
			$scope.isshow=false;
		}else{
			$scope.isshow=true;
		
		}
		
	}
	$scope.num=0;
	$scope.add=function($index){
//		alert($(".numyu").eq($index).html())
		$(".numyu").eq($index).html(parseInt($(".numyu").eq($index).html())+1)
	}
	$scope.less=function($index){
		if($(".numyu").eq($index).html()==0){
			$(".numyu").eq($index).html("0")
		}else{
			$(".numyu").eq($index).html(parseInt($(".numyu").eq($index).html())-1)
		}
	}
	$scope.zero=function($index){
		$(".numyu").eq($index).html("0")
	}
//	alert("ok")
//	$("#yu").on('touchend',function(){
//		alert("ok")
//	})
//	$(".num").eq(1).html("2")
//	$(".add1").on("touchend",function(){
////		var num=$(this).index(".add");
//		alert("ok")
//	})
 })
// m1.animation(".yuss",function(){
//			 	return{
//			 	 leave:function(element,done){
//			 	 	$(element).animate({
//			 	 		
//			 	 		height:0
//			 	 	},500,done);
//			 	 },
//			 	 enter:function(element,done){
//			 	 	$(element).css({
//			 	 		
//			 	 		height:0
//			 	 		})
//			 	 	$(element).animate({
//			 	 	
//			 	 		height:200
//			 	 	},500,done);
//			 	 }
//			 	}
//			 })
 
  
m1.controller("guanzhu",function($state,$http,$scope,$stateParams){
	$scope.guanzhusrc=[
	{"src":"../images/guanzhu/img1.jpg","name":"晴天","time":"13","intro":"约上三五好友,忙里偷闲,享受难得的静谧时光,快点约起来吧","shopname":"休闲时光餐厅","num1":"88","num2":"12","numguanzhu":"8120","dis":"500","head":"../images/guanzhu/head1.jpg"},
	{"src":"../images/guanzhu/img2.jpg","name":"Tina","time":"16","intro":"刚和朋友去喝过咖啡环境超好,咖啡也超级好喝,喜欢小清新分割的朋友一定要去哦","shopname":"研磨时光","num1":"78","num2":"15","numguanzhu":"7120","dis":"2100","head":"../images/guanzhu/head2.jpg"},
	{"src":"../images/guanzhu/img3.jpg","name":"安安","time":"23","intro":"看起来是不是很诱人,那还等什么,快快来享受美食,生意火爆,提前预约哦","shopname":"时尚西餐厅","num1":"68","num2":"10","numguanzhu":"6420","dis":"2500","head":"../images/guanzhu/head3.jpg"}]
})

//function swip(id){
////	alert("ok")
//	 var swiper = new Swiper(id,{
//		loop:true
//		autoplay:1000,
////		slidesPerView:'auto',
////		centeredSlides:true,
////		watchSlidesProgress:true,
////		onProgress:function(swiper){
////			for(var i =0;i<swiper.slides.length;i++){
////				var slide = swiper.slides[i];
////				var progress = slide.progress;
////				es = slide.style;
////				es.opacity=1-Math.min(Math.abs(progress/3),1);
////				es.webkitTransform=es.transform ="translate3d(0,0,"+(-Math.abs(progress*150))+"px)";
////			}	
////		}
//	})
//}


m1.controller("coffee",["$scope","$http","$state","$stateParams",function($scope,$http,$state,$stateParams){
	$scope.title = "咖啡茶点";
	$scope.sortList = [
	{"name":"附近"},
	{"name":"美食"},
	{"name":"排序"},
	{"name":"筛选"}
	];
	$http({
		method:"get",
		url:"../js/data.json",
		params:{"num":$stateParams.num}
	}).success(function(data,num){
		var num = $stateParams.num;
		//console.log(data.coffee[num]);
		$scope.dataLeft = data.coffee[num].left;
		$scope.dataRight = data.coffee[num].right;
	})
}]);

m1.controller("mine",["$scope","$state","$http",function($scope,$state,$http){
	$scope.psd="";
	$scope.login_user;
	$scope.login_psd;
	$scope.login = function(){
		$http({
			method:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			params:{status:"register",userID:$scope.user,password:$scope.psd}
		}).success(function(data){
			//console.log(data);
			if(data == 0){
				alert("该用户名已经被注册");
			}
			if(data == 1){
				alert("注册成功");
				$state.go("login");
			}
			if(data == 2){
				alert("浏览器出现异常");
			}
		})
	}
	$scope.goMine = function(){
		$http({
			method:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			params:{status:"login",userID:$scope.login_user,password:$scope.login_psd}
		}).success(function(data){
			//console.log(data);
			if(data[0] !=""){
				var str = '{"userID":"'+$scope.login_user+'","password":"'+$scope.login_psd+'"}';
				alert("登录成功");
				localStorage.setItem("user",str);
				$state.go("mine");
				//console.log(str);
			}else{
				alert("用户名与密码不匹配");
			}
		})
	}
	$scope.goRegister = function(){
		$state.go("register");
	}
}])