/*
*类 --> 用来抽象一篇文章
* 按JSON数据来生成一个新的节点
*/
function article(articleJSON){
	this.shell = document.createElement("div");
	this.titleNode = document.createElement("h3");
	this.descriptNode = document.createElement("div");
	this.tagsNode = document.createElement("span");
	this.timeNode = document.createElement("span");
	this.linkNode = document.createElement("a");
	this.linkNode.innerHTML ="Read »";
	this.linkNode.href=articleJSON['url'];

	this.linkNode.className = "read_button";
	this.shell.className = "article";
	this.tagsNode.className = "tags";

	this.setTitle(articleJSON["title"]);
	this.setTime(articleJSON['time']);
	this.setTags(articleJSON['tags']);
	this.setDescript(articleJSON['description']);

	this.shell.appendChild(this.titleNode);
	this.shell.appendChild(this.timeNode);
	this.shell.appendChild(this.tagsNode);
	this.shell.appendChild(this.descriptNode);
	this.shell.appendChild(this.linkNode);
	return this;
}
article.prototype.hide=function(){
	this.shell.classList.add("hide");
}
article.prototype.show=function(){
	this.shell.classList.remove("hide");
}
article.prototype.update=function(Msg){
	this.setTitle(Msg['title']);
	this.setTime(Msg['time']);
}
article.prototype.setTitle=function(title){
	this.titleNode.className = "article_title";
	this.titleNode.innerHTML=title;
}
article.prototype.setDescript=function(descript){
	this.descriptNode.className = "description";
	this.descriptNode.innerHTML=descript;
}
article.prototype.setTime=function(time){
	let d_value = Date.now()-time;
	d_value=~~(d_value/1000);
	if(d_value<60){
		d_value=d_value+" 秒前";
	}else if(d_value>=60&&d_value<3600){
		d_value=~~(d_value/60)+" 分钟前";
	}else if(d_value>=3600&&d_value<86400){
		d_value=~~(d_value/3600)+" 小时前";
	}else if(d_value>=8640&&d_value<31536000){
		d_value=~~(d_value/86400)+" 天前";
	}else if(d_value>=31536000){
		d_value=~~(d_value/31536000)+" 年前";
	}
	this.timeNode.innerHTML =  "上传于："+d_value;
	this.timeNode.className = "article_time";
}
article.prototype.setTags=function(tag_list){
	let tempNode = null;
	for(var i of tag_list){
		tempNode=document.createElement("span");
		tempNode.className="tag";
		tempNode.innerHTML=i;
		this.tagsNode.appendChild(tempNode);
	}
}

function articleControl(){
	this.node = document.querySelector("#article_list");
	this.articleCollection = [];
}
articleControl.prototype.add = function(Msg) {
	let x = new article(Msg);
	x.show();
	this.node.appendChild(x.shell);
	this.articleCollection[this.articleCollection.length]=x;

};
articleControl.prototype.update = function(data){
	let num = this.node.children.length - data.length;
	if ( num == 0){
		/*填充*/
		for(let i = data.length-1,x=0; i>= 0 ; i--,x++){
				this.articleCollection[x].update(data[i]);
				this.articleCollection[x].show();
		}
	}else if(num>0){
		/*填充*/
		for(let i = data.length-1,x=0; i>= 0 ; i--,x++){
				this.articleCollection[x].update(data[i]);
				this.articleCollection[x].show();
		}
		/*隐藏*/
		this.hide(num);
	}else{
		/*填充*/
		/*添加*/
			let i = 0;
			let x=data.length-1;
			let sum=(-num)+this.articleCollection.length;

			for(; i<this.articleCollection.length ; i++,x--){
				this.articleCollection[i].update(data[x]);
				this.articleCollection[i].show();
			}
			for(;i<sum;i++){
				this.add(data[x--]);
			}
	}
}
articleControl.prototype.hide = function(count){
	for(let x = this.articleCollection.length-1;count>0;x--,count--){
		this.articleCollection[x].hide();
	}
}
function search(){
	let input = document.querySelector("[name=key]");
	input.onkeyup = function(event){
		if(event.key!="Enter")
			return true;
		let arr = [];
		let x=0;
		for(var i = 0 ;i<BigData.length;i++){
			if(BigData[i].title.includes(input.value)){
				arr[x++]=BigData[i];
			}
		}
		articles.update(arr);
	}
}
function tags_list(){
	
}
/*function DataSource(){
	this.ajax = new XMLHttpRequest();
	this.ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			ajax.dataForObj  = JSON.parse(ajax.responseText);
			articles.update(BigData);
			localStorage["schema"]=ajax.responseText;
			localStorage["timestamp"]=Date.now();
		}
	}
	this.ajax.dataForText = "";
	this.ajax.dataForObj = "";
}*/
















document.querySelector("#fun").onclick=(function(){
let num = 0;
let arr=[
"你为什么要在主页上点击主页呢？",
"哇，你还点？",
"主页上设计一个主页按钮，这是我所见过愚蠢的事物合集之一",
"你知道人们为什么要在主页上设计一个主页按钮？",
"再点一下，我就跟你讲实话",
"为了对称",
"然而如果你需要这么一个蠢按钮凑出对称性",
"显然你需要重新考虑你的设计了",
"看看汽车工业里面那些傻逼",
"就会设计一些没得卵用的对称性按钮",
"而从不考虑自己的设计是多么的无聊",
"说回来既然主页上不该有主页按钮",
"那为什么这个站点依然有主页按钮呢？",
"这就是用自身阐述自身，告诉你有这么一回事情",
"再见了，老哥，再点一次我就变回主页了，后会有期",
"主页"
];
return function(){
	this.innerHTML=arr[num%arr.length];
	num++;
}
})();