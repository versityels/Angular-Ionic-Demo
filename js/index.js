var m1 = angular.module("mainApp",["ionic"]);
    	
m1.config(["$stateProvider",function($stateProvider){
	$stateProvider.state("sort",{
		url:"/homepage",
		templateUrl:"sort.html"
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
//m1.controller("demo",["$scope","$state","$http","$stateParams",function($scope,$state,$http,$stateParams){
//	$state.go("sort");
//}])
m1.controller("sort",["$scope","$state","$http","$stateParams",function($scope,$state,$http,$stateParams){
//	$state.go("sort");
	$scope.goMe = function(){
		var data = localStorage.getItem("user");
		console.log(data);
		if(data&&data!=""){
			$state.go("mine");
		}else{
			$state.go("login");
		}
	}
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

m1.controller("mine",["$scope","$state",function($scope,$state){
	$scope.isTrue = {invalid:false};
	$scope.name = "";
	$scope.namephd = "username";
	$scope.login = function(){
//		_register();
//		var regAccount = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,20}$/;
//		var regPassword = /^[A-Za-z0-9]{6,12}$/;
		if($scope.name == ""){
			$scope.namephd = "用户名不能为空!";
			$scope.isTrue = {invalid:true};
		}
	}
	$scope.goMine = function(){
		_login();
	}
	$scope.goRegister = function(){
		$state.go("register");
	}
//	function _register(){
//		var regAccount = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,20}$/;
//		var regPassword = /^[A-Za-z0-9]{6,12}$/;
//		var name = $("#name").val();
//		var psw = $("#psw").val();
//		var repsw = $("#repsw").val();
//		if(name == ""){
//			$("#name").attr("placeholder","用户名不能为空!");
//			$("#name").addClass("invalid");
//		}else if(!regAccount.test(name)){
//			$("#name").val("");
//			$("#name").attr("placeholder","4-20位英文字母、中文、数字、下划线短横线");
//			$("#name").addClass("invalid");
//		}else{
//			if(psw == ""){
//				$("#psw").attr("placeholder","密码不能为空!");
//				$("#psw").addClass("invalid");
//			}else if(!regPassword.test(psw)){
//				$("#psw").val("");
//				$("#psw").attr("placeholder","6-20位英文字母、数字");
//				$("#psw").addClass("invalid");
//			}else{
//				if(repsw == ""){
//					$("#repsw").attr("placeholder","重复密码不能为空!");
//					$("#repsw").addClass("invalid");
//				}else if(psw != repsw){
//					$("#repsw").val("");
//					$("#repsw").attr("placeholder","两次密码输入不一致");
//					$("#repsw").addClass("invalid");
//				}else{
//					var user = getUser(name,psw);
//					toRegister(user);
//				}
//			}
//		}
//	}
//	
//	
//	function getUser(name,psw){
//		var user = {
//			userID : name,
//			password : psw
//		}
//		return user;
//	}
//	
//	function toRegister(user){
//		$.ajax({
//			type:"post",
//			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
//			data:{status:"register",userID:user.userID,password:user.password},
//			async:true,
//			success:function(data){
//				if(data == 0){
//					alert("该用户名已经被注册");
//				}
//				if(data == 1){
//					alert("注册成功");
//					$state.go("login");
//				}
//				if(data == 2){
//					alert("浏览器出现异常");
//				}
//			}
//		});
//	}

	function _login(){
		var name = $("#login_name").val();
		var psw = $("#login_psw").val();
		if(name == ""){
			$("#login_name").attr("placeholder","用户名不能为空!");
			$("#login_name").addClass("invalid");
		}else{
			if(psw == ""){
				$("#login_psw").attr("placeholder","密码不能为空!");
				$("#login_psw").addClass("invalid");
			}else{
				var user = getUser(name,psw);
				toLogin(user);
			}
		}
	}
	
	function getUser(name,psw){
		var user = {
			userID : name,
			password : psw
		}
		return user;
	}
	
	function toLogin(user){
		$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:user.userID,password:user.password},function(data){
			if(data.charAt(0) == "{"){
				var str = '{"userID":"'+user.userID+'","password":"'+user.password+'"}';
				alert("登录成功");
				$state.go("mine");
				//sessionStorage.setItem("user",str);
				localStorage.setItem("user",str);
				//window.location = "product.html";
			}else{
				alert("用户名与密码不匹配");
			}
		});
	}
}])