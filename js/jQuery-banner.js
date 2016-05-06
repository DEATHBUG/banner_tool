/* 
* Banner 0.1
* Date: 2016-05-03 
* 使用Banner可以方便地调用轮播效果，支持左右方向，前页下一页的点击事件。轮播效果小点的展示效果
*/ 
;(function($){
	$.fn.Banner=function(options){
		var defaults={
			child:'li',			//包含图片的父级标签,默认li
			time:'3000',		//轮播间隔时间
			direction:"right",	//轮播方向，目前仅支持left和right
			choose:'false',		//是否支持触摸小点的轮播触摸事件,默认false。
			chooseId:'id',		//小点外部父级标签ID。仅限choose开关打开。
			chooseActive:'red',	//支持小点的选中状态classname。仅限choose开关打开。
			preId:'pre',		//向前翻页的按钮id
			nextId:'next'		//向后翻页的按钮id
		};
		var options=$.extend(defaults,options);//合并传来options参数到defaults里面并覆盖原参数，得到新的含有传参的defaults参数列，并命名为options
		var $index=0;
		var $exdex=0;
		var atime;
		this.each(function(){
			var thisli=$(this);
			$(thisli).css({"position":"relative","overflow":"hidden"});
			$(thisli).find(options.child).css({"display":"block","float":"left","position":"absolute","left":"100%","top":"0","width":"100%","height":"100%"});
			$(thisli).find(options.child).find("img").css({"width":"100%","height":"100%"});
			$(thisli).find(options.child).eq(0).css({"left":"0"});			
			play(thisli,options.direction,options.time);
			roll();
			choose(thisli);
			$("#"+options.preId).bind("click",function(){
				clearInterval(atime);
				pre(thisli);
				play(thisli,options.direction,options.time);
			});
			$("#"+options.nextId).bind("click",function(){
				clearInterval(atime);
				next(thisli);
				play(thisli,options.direction,options.time);
			})
		});
		//触摸小点标记事件
		function choose(obj){
			if(options.choose){
				$("#"+options.chooseId).children().bind("click",function(){
					clearInterval(atime);
					//获取当前移入的index值
					$index=$(this).index();		
					//首先让点的颜色变化，表示选中
					$("#"+options.chooseId).children().eq($index).addClass(options.chooseActive).siblings().
							removeClass(options.chooseActive);
					//判断如果index变小，证明图片要往左移动。变大则为右移
					if($index>$exdex){
						$index--;
						next(obj);
					}else if($index<$exdex){
						$index++;
						pre(obj);
					}
					play(obj,options.direction,options.time);
					//移动完毕将当前index值替换了前页index
					return $exdex=$index;
				})
			}else{
				return false;
			}
		}
		//定时器	
		function play(thisli,direction,time){
			atime=setInterval(function(){
				if(direction=="right"){
					next(thisli);
				}else if(direction=="left"){
					pre(thisli);	
				}
			},time);
		}
		//下一页跳转
		function next(obj){
			$index++;
			if($index>$(obj).find(options.child).length-1){
				$index=0;
			};
			roll();
			$(obj).find(options.child).eq($exdex).css({left:"0"}).stop(true,true).animate({"left":"-100%"},1000);
			$(obj).find(options.child).eq($index).css({left:"100%"}).stop(true,true).animate({"left":"0"},1000);
			return $exdex=$index;
		};
		//上一页跳转
		function pre(obj){
			$index--;
			roll();
			if($index<0){
				$index=$(obj).find(options.child).length-1;
			};
			$(obj).find(options.child).eq($exdex).css({left:"0"}).stop(true,true).animate({"left":"100%"},1000);
			$(obj).find(options.child).eq($index).css({left:"-100%"}).stop(true,true).animate({"left":"0"},1000);
			return $exdex=$index;
		}
		//如果有小点进行轮播标记
		function roll(){
			if(options.choose){
				$("#"+options.chooseId).children().eq(0).addClass(options.chooseActive);
				$("#"+options.chooseId).children().eq($index).addClass(options.chooseActive).siblings().removeClass(options.chooseActive);
			}else{
				return false;
			}
		}
	};	
})(jQuery)
