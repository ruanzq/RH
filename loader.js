function getEntry(articleName,uploadTime,tags){
	var nameNode = document.createElement("div");
	nameNode.className = "articleName";
	nameNode.innerHTML = articleName;
	var timeNode = document.createElement("div");
	timeNode.className = "uploadTime";
	timeNode.innerHTML = uploadTime;
	var tagsNode = document.createElement("div");
	tagsNode.className = "tags";
	for(var i in tags){
		var tempTag = document.createElement("span");
		tempTag.className = "tag";
		tempTag.innerHTML = tags[i];
		tagsNode.appendChild(tempTag);
	}
	var entryNode = document.createElement("div");
	entryNode.className = "entry";
	entryNode.appendChild(nameNode);
	entryNode.appendChild(timeNode);
	entryNode.appendChild(tagsNode);
	return entryNode;
}
/*var ajax = new XMLHttpRequest();
ajax.open("GET","entrylist.json",true);
ajax.send(null);
ajax.onreadystatechange=function(){
	if(ajax.readyState == 4){
		var entrylist = JSON.parse(ajax.responseText);
		var node = document.querySelector("#entryBox");
		for(var i in entrylist){
			node.appendChild(getEntry(entrylist[i].articleName,entrylist[i].uploadTime,entrylist[i].tags));
		}
	}
}*/