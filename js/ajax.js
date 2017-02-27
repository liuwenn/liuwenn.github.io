
//ajax(method,url,value,dataType,succ,fail)



function ajax(json){
	//alert()
	//debugger
	
	var options = {
		"method":json.method || 'get',
		"dataType":json.dataType || '',
		"url":json.url || '',
		"value" : json.value || '',
		"succ" : json.succ,
		"fail" : json.fail
	}
	
	
	//alert(json.method)
	
	var ajax = null;
	if(window.XMLHttpRequest){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	/*
		如果是给别人用，那么有可能别人会写成大写的POST，为了避免bug产生加toLowerCase（统一大小写）
	*/
	if(options.method.toLowerCase() === 'post'){
		ajax.open(options.method,options.url,true);
	}else{
		
		//在IE下拼写的时候有可能会出现中文，那么要统一编码
		ajax.open(options.method,options.url+'?'+encodeURI(options.value),true);
	}
	
	
	if(typeof ajax.onload === 'object'){
		ajax.onload = function(){
			if(ajax.status === 200){//请求成功了
				if(options.succ && typeof options.succ === 'function'){
					//看看传进来的数据格式是什么类型的（要么是json，要么是XML，要么是string）
					//console.log(json.dataType)
					if(options.dataType.toLowerCase() === 'json'){
						//options.succ(JSON.parse(ajax.responseText));
						options.succ(eval('('+ajax.responseText+')'));
					}else if(options.dataType.toLowerCase() === 'xml'){
						options.succ(ajax.responseXML);
					}else{
						//alert(ajax.responseText)
						options.succ(ajax.responseText);
					}
				}
			}else{
				//请求失败。
				if(options.fail && typeof options.fail === 'function'){
					options.fail(ajax.status);
				}
			}
		}
	}else{
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4){
				if(ajax.status === 200){//请求成功了
					if(options.succ && typeof options.succ === 'function'){
						//看看传进来的数据格式是什么类型的（要么是json，要么是XML，要么是string）
						//console.log(json.dataType)
						if(options.dataType.toLowerCase() === 'json'){
							options.succ(JSON.parse(ajax.responseText));
						}else if(options.dataType.toLowerCase() === 'xml'){
							options.succ(ajax.responseXML);
						}else{
							//alert(ajax.responseText)
							options.succ(ajax.responseText);
						}
					}
				}else{
					//请求失败。
					if(options.fail && typeof options.fail === 'function'){
						options.fail(ajax.status);
					}
				}
			}
			
		}
		
	}
	
	
	if(options.method.toLowerCase() === 'post'){
		ajax.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
		ajax.send(options.value);
	}else{
		ajax.send();
	}
	
	
	
	
	
	
	
}
