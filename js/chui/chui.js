chui={minWidth:200,minHeight:200,flags:0};var escaper=encodeURIComponent||escape,decoder=decodeURIComponent||unescape,CHUI_FLAG_SIZABLE=1,CHUI_FLAG_MOVABLE=2,CHUI_FLAG_FADEIN=4,CHUI_FLAG_CLOSABLE=8;chui.setCookie=function(e,t,i){t=escaper(t);var o=new Date;o.setTime(o.getTime()+24*i*60*60*1e3);o=e+"="+t+"; "+("expires="+o.toUTCString())+"; path=/";document.cookie=o},chui.getCookie=function(e){for(var t=e+"=",i=document.cookie.split(";"),o=0;o<i.length;o++){for(var c=i[o];" "==c.charAt(0);)c=c.substring(1);if(0===c.indexOf(t))return decoder(c.substring(t.length,c.length))}return""},chui.setLabel=function(e,t){$("a").contents().filter(function(){return 3===this.nodeType})[0].textContent=t},chui.bycall=function(e,t){(t=t||{})._cact=e;const i=new XMLHttpRequest;i.open("GET","?src="+chui.window+"&"+$.param(t)),i.send()},chui.close=function(){document.location="byond://winset?command="+escaper(".chui-close "+chui.window),chui.winset("is-visible","false")},chui.winset=function(e,t){document.location="byond://winset?"+chui.window+"."+e+"="+escape(t)},chui.winsets=function(e){document.location="byond://winset?id="+chui.window+"&"+$.param(e)},chui.setPos=function(e,t){chui.winset("pos",e+","+t)},chui.setSize=function(e,t){chui.winset("size",e+","+t)},chui.setPosSize=function(e,t,i,o){document.location="byond://winset?"+chui.window+".size="+escape(i+","+o)+"&"+chui.window+".pos="+escape(e+","+t)},chui.chatDebug=function(e){document.location="byond://winset?command="+escaper(".output browseroutput:output "+escaper(e))},chui.initialize=function(){chui.data={},$("meta").each(function(){var e=$(this).attr("name");e&&(chui.data[e]=$(this).attr("value"))}),chui.window=chui.data.ref,chui.flags=Number(chui.data.flags),$("#content").nanoScroller({scrollTop:window.name}),chui.winset("transparent-color","#FF00E4");var e,t=window.screenLeft,i=window.screenTop,o=chui.getCookie("chuiOffset");o&&(e=$.parseJSON(o),chui.offsetX=e.offsetX,chui.offsetY=e.offsetY),chui.setPos(0,0),chui.offsetX=window.screenLeft,chui.offsetY=window.screenTop;t-=chui.offsetX,i-=chui.offsetY,t=t<chui.offsetX?0:t,i=i<chui.offsetY?0:i;o||(o={offsetX:chui.offsetX,offsetY:chui.offsetY},chui.setCookie("chuiOffset",JSON.stringify(o),.333)),chui.setPos(t,i),$("body").on("mousemove","#titlebar",function(e){var t,i;e=e||window.event,void 0===chui.lastX&&(chui.lastX=e.screenX,chui.lastY=e.clientY),1==chui.titlebarMousedown&&(t=e.screenX-chui.lastX,i=e.screenY-chui.lastY,t+=window.screenLeft-chui.offsetX,i+=window.screenTop-chui.offsetY,chui.setPos(t,i)),chui.lastX=e.screenX,chui.lastY=e.screenY}),$("body").on("mousedown","#titlebar",function(){chui.titlebarMousedown=1,$(this)[0].setCapture&&$(this)[0].setCapture()}),$("body").on("mouseup","#titlebar",function(){chui.titlebarMousedown=0,$(this)[0].releaseCapture&&$(this)[0].releaseCapture()}),chui.flags&0<CHUI_FLAG_SIZABLE?($("body").on("mousemove","div.resizeArea",function(e){var t,i,o,c,n,s,u,a;chui.resizeWorking||(chui.resizeWorking=!0,e=e||window.event,void 0===chui.lastX&&(chui.lastX=e.screenX-chui.offsetX,chui.lastY=e.screenY-chui.offsetY),1==chui.resizeMousedown&&(u=document.body.offsetWidth,a=document.body.offsetHeight,t=Number($(this).attr("rx")),i=Number($(this).attr("ry")),o=e.screenX-chui.offsetX-chui.lastX,c=e.screenY-chui.offsetY-chui.lastY,n=window.screenLeft-chui.offsetX,s=window.screenTop-chui.offsetY,u=u+o*t,-1==t&&(n+=o),a=a+c*i,-1==i&&(s+=c),u=Math.max(chui.minWidth,u),a=Math.max(chui.minHeight,a),chui.setPosSize(n,s,u,a)),chui.lastX=e.screenX-chui.offsetX,chui.lastY=e.screenY-chui.offsetY,chui.resizeWorking=!1)}),$("body").on("mousedown","div.resizeArea",function(){chui.resizeMousedown=1,this.setCapture&&this.setCapture()}),$("body").on("mouseup","div.resizeArea",function(){chui.resizeMousedown=0,this.releaseCapture&&this.releaseCapture()})):$("div.resizeArea").remove(),$("body").on("click","a.button",function(){var t=null;try{t=this.dataset.info}catch(e){t=this.getAttribute("data-info")}chui.bycall("click",{id:this.id,data:t})}),$(".close").click(function(){chui.flags&CHUI_FLAG_FADEIN?chui.fadeOut():chui.close()}),$(".close").attr("href","#"),chui.bycall("register"),chui.flags&CHUI_FLAG_FADEIN&&chui.fadeIn(),chui.data.needstitle&&$("#windowtitle").text($("title").text()||" ")},chui.fadeIn=function(){var i=document.body.offsetWidth,o=document.body.offsetHeight,c=window.screenLeft-chui.offsetX,n=window.screenTop-chui.offsetY;chui.setSize(i+80,o+80),chui.setPos(c-40,n-40),chui.winset("alpha","0"),setTimeout(function(){$({foo:0}).animate({foo:1},{duration:1e3,step:function(e){var t=1-e;chui.winsets({alpha:255*e,size:i+80*t+","+(o+80*t),pos:c-40*t+","+(n-40*t)})}})},1e3)},chui.fadeOut=function(){var i=document.body.offsetWidth,o=document.body.offsetHeight,c=window.screenLeft-chui.offsetX,n=window.screenTop-chui.offsetY;$({foo:1}).animate({foo:0},{duration:1e3,step:function(e){var t=1-e;chui.winsets({alpha:255*e,size:i+80*t+","+(o+80*t),pos:c-40*t+","+(n-40*t)})},complete:chui.close})},chui.templateSet=function(e,t){e=document.getElementById("chui-tmpl-"+e);e&&(e.innerText=t)},chui.templateBulk=function(e){var t=JSON.parse(e);if(t)for(var i in t){var o=document.getElementById("chui-tmpl-"+i);o&&(o.innerText=t[i])}};var activeRequests=[],reqID=0;function updateScroll(){window.name=$("#content")[0].nanoscroller.contentScrollTop}chui.request=function(e,t,i){activeRequests.push({id:++reqID,callback:i}),t._id=reqID,t._path=e,chui.bycall("request",t)},window.addEventListener("beforeunload",updateScroll),window.addEventListener("scroll",updateScroll),$(chui.initialize);