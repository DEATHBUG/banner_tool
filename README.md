# banner_tool基于JQ图片轮播插件
一个简单的banner轮播图插件，对于PC端用途极广的轮播有着良好的支持。
目前仅支持控制轮播的时间间隔，轮播方向为左右，
choose为前面触点标记，若为true则为打开，需加载如下触点父级标签ID，以及用户点击的样式变化class；
如果添加前后翻页按钮，则添加参数前后翻页的按钮ID；
<div  id="dian">
	<span></span>
	<span></span>
	<span></span>
	<span></span>
</div>
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
		
		
		如果发现有什么问题，或者有其他参数希望添加，希望能及时反馈，请不吝赐教！
