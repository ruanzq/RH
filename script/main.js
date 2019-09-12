let ajax = new XMLHttpRequest();
let BigData = null;
let articles = new articleControl();

ajax.onreadystatechange=function(){
	if(ajax.readyState == 4){
		BigData = JSON.parse(ajax.responseText);
		articles.update(BigData);
		localStorage["schema"]=ajax.responseText;
		localStorage["timestamp"]=Date.now();
	}
}
if(localStorage.timestamp == undefined||true){
	ajax.open("GET","schema/key.json",true);
	ajax.send(null);
}else{
	articles.update(JSON.parse(localStorage.schema));
	BigData = JSON.parse(localStorage.schema);
}
search()