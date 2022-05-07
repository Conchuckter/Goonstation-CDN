var ref,tags={TAG_ORE:1,TAG_WRECKAGE:2,TAG_PLANET:4,TAG_ANOMALY:8,TAG_SPACE:16,TAG_NPC:32,TAG_TELEPORT_LOC:64,TAG_CRUISER_LOC:128,TAG_MAGNET_LOC:256},marks=[],events=[],pins=[],canvas=document.getElementById("canvasOverlay"),context=canvas.getContext("2d"),image=document.getElementById("imageSource"),map=document.getElementById("mapSource"),buttonsDiv=document.getElementById("divButtons"),glitchProps={lastGlitch:Date.now(),glitching:!1,glitchCount:0,glitchFrame:1,glitchLength:40,glitchCooldown:1e3},cooldownProps={lastUse:0,cooldown:2500,barOpacity:0,barOpacityMax:.3,barFadeSpeed:.015},pings=[],timerDelay=33;window.addEventListener("resize",resizeCanvas),canvas.addEventListener("click",clickMap),canvas.addEventListener("contextmenu",clearMap),timer=setInterval(update,timerDelay);var setRef=function(t){ref=t};function callByond(t,e){e="?src="+ref+"&jscall="+t+"&"+e.join("&");window.location=e}function clearMap(t){null!=t&&t.preventDefault(),marks=[]}function clearEvents(){events=[],buttonsDiv.innerHTML=""}function showFooterMsg(t){document.getElementById("footer").innerText=t}function rebuildEventList(){for(var t=events.length-1;0<=t;t--){var e=events[t],a="";a+="<a class='telescopeButton "+(e.discovered?"discovered":"undiscovered")+" "+(e.tracking?"underline":"")+"' href='#' onclick='buttonClick(\""+e.reference+"\");return false;'>"+e.name+"</a>",e.type&tags.TAG_ORE&&(a+="<div class='tooltip'><i class='icon-star-empty'></i><span class='tooltiptext'>Ore</span></div>"),e.type&tags.TAG_WRECKAGE&&(a+="<div class='tooltip'><i class='icon-gear'></i><span class='tooltiptext'>Wreckage</span></div>"),e.type&tags.TAG_PLANET&&(a+="<div class='tooltip'><i class='icon-globe'></i><span class='tooltiptext'>Planet</span></div>"),e.type&tags.TAG_ANOMALY&&(a+="<div class='tooltip'><i class='icon-question'></i><span class='tooltiptext'>Anomaly</span></div>"),e.type&tags.TAG_SPACE&&(a+="<div class='tooltip'><i class='icon-circle-blank'></i><span class='tooltiptext'>Space</span></div>"),e.type&tags.TAG_NPC&&(a+="<div class='tooltip'><i class='icon-comment-alt'></i><span class='tooltiptext'>Person</span></div>"),e.type&tags.TAG_TELEPORT_LOC&&(a+="<div class='tooltip'><i class='icon-anchor'></i><span class='tooltiptext'>Teleporter</span></div>"),e.type&tags.TAG_CRUISER_LOC&&(a+="<div class='tooltip'><i class='icon-rocket'></i><span class='tooltiptext'>Cruiser</span></div>"),e.type&tags.TAG_MAGNET_LOC&&(a+="<div class='tooltip'><i class='icon-magnet'></i><span class='tooltiptext'>Magnet</span></div>"),a+="<br>",buttonsDiv.innerHTML=buttonsDiv.innerHTML+a}}function getEventByRef(t){for(var e=events.length-1;0<=e;e--){var a=events[e];if(a.reference==t)return a}return null}function buttonClick(t){t=getEventByRef(t);null!=t&&(t.discovered?callByond("activate",["id="+t.reference]):t.tracking||(callByond("track",["id="+t.reference]),clearMap(null)))}function addEvent(t,e,a,n,o){events.push({name:t,type:parseInt(e),discovered:parseInt(a),tracking:parseInt(n),reference:o})}function byondAddMark(t,e,a){addMark(parseInt(t),parseInt(e),parseInt(a),3048959,0)}function byondFound(t,e,a,n){clearMap(null),addPing(t,e,60,"green",.3,10)}function addMark(t,e,a,n,o){marks.push({x:t,y:e,size:a,currentSize:0,color:n,fromColor:o,animationLength:2e3,currentStep:0})}function addPing(t,e,a,n,o,i){pings.push({x:t,y:e,size:0,maxSize:a,growSpeed:o,color:n,width:i})}function update(){for(var t=0;t<marks.length;t++){var e=marks[t],a=e.animationLength/timerDelay;e.currentStep;e.currentStep<=a?(a=easeInOutCirc(e.currentStep,0,e.size,a),e.currentSize=a,e.currentStep++):e.currentSize=e.size}Date.now()-glitchProps.lastGlitch>=glitchProps.glitchCooldown&&0==glitchProps.glitching&&(glitchProps.lastGlitch=Date.now(),glitchProps.glitchCooldown=Math.floor(1e4*Math.random())+1e3,glitchProps.glitchLength=Math.floor(70*Math.random())+10,glitchProps.glitching=!0),redrawCanvas()}function getScalar(){var t=parseFloat(window.getComputedStyle(map).getPropertyValue("width")),e=parseFloat(window.getComputedStyle(map).getPropertyValue("height"));return[t/map.naturalWidth,e/map.naturalHeight]}function tryPing(t,e){callByond("ping",["x="+t,"y="+e])}function clickMap(t){var e=t.target.getBoundingClientRect(),a=t.clientX-e.left,t=t.clientY-e.top,e=getScalar();if(Date.now()-cooldownProps.lastUse<cooldownProps.cooldown)return addPing(a/e[0],t/e[1],25,"#CD5C5C",1,2),!1;cooldownProps.lastUse=Date.now(),cooldownProps.barOpacity=cooldownProps.barOpacityMax,addPing(a/e[0],t/e[1],45,"white",1.5,2),tryPing(a/e[0],t/e[1])}function drawArea(t,e,a,n,o,i){var r=getScalar();t.globalAlpha=.15*i,t.lineWidth=2*r[0],t.strokeStyle="white",t.fillStyle=o,t.beginPath(),t.arc(e*r[0],a*r[1],n*r[0],0,2*Math.PI),t.fill(),t.stroke(),t.beginPath(),t.closePath()}function redrawCanvas(){var t=getScalar();context.clearRect(0,0,canvas.width,canvas.height),context.globalAlpha=1,context.drawImage(map,0,0,canvas.width,canvas.height);for(var e=pings.length-1;0<=e;e--){var a=pings[e],n=Math.min(a.size/a.maxSize,1);context.strokeStyle=a.color,context.lineWidth=a.width*t[0],context.globalAlpha=1-n,context.beginPath(),context.arc(a.x*t[0],a.y*t[1],a.size*t[0],0,2*Math.PI),context.stroke(),a.size=Math.min(a.size+a.growSpeed,a.maxSize),1==n&&pings.splice(e,1)}context.beginPath(),context.closePath();for(var o=0;o<marks.length;o++){var i=(o+1)/marks.length,r=marks[o],c=Math.min(r.currentSize/r.size,1);drawArea(context,r.x,r.y,r.currentSize,lerpColor(r.fromColor,r.color,c),c*(2*i))}var l=Date.now()-cooldownProps.lastUse,s=Math.min(l/cooldownProps.cooldown,1);context.globalAlpha=cooldownProps.barOpacity,context.rect(0,canvas.height-5,canvas.width*s,5),context.fillStyle=lerpColor(16711680,65280,s),context.fill(),1==s&&(cooldownProps.barOpacity=Math.max(cooldownProps.barOpacity-cooldownProps.barFadeSpeed,0)),glitchProps.glitching&&(glitchProps.glitchCount++,glitchProps.glitchCount>glitchProps.glitchLength&&(glitchProps.glitching=!1,glitchProps.glitchCount=0),l=glitchProps.glitchCount/glitchProps.glitchLength,s=document.getElementById("noise"+glitchProps.glitchFrame),context.globalAlpha=.06*(1-2*Math.abs(.5-l)),context.drawImage(s,0,0,canvas.width,canvas.height),4==++glitchProps.glitchFrame&&(glitchProps.glitchFrame=1)),context.globalAlpha=.1,context.drawImage(image,0,0,canvas.width,canvas.height)}function resizeCanvas(){var t=parseFloat(window.getComputedStyle(map).getPropertyValue("width")),e=parseFloat(window.getComputedStyle(map).getPropertyValue("height"));canvas.width=t,canvas.height=e,redrawCanvas()}function lerpColor(t,e,a){var n=t>>16,o=t>>8&255,t=255&t;return"#"+((1<<24)+(n+a*((e>>16)-n)<<16)+(o+a*((e>>8&255)-o)<<8)+(t+a*((255&e)-t))|0).toString(16).slice(1)}function easeInOutQuad(t,e,a,n){return(t/=n/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e}function easeInOutCubic(t,e,a,n){return(t/=n/2)<1?a/2*Math.pow(t,3)+e:a/2*(Math.pow(t-2,3)+2)+e}function easeInOutCirc(t,e,a,n){return(t/=n/2)<1?a/2*(1-Math.sqrt(1-t*t))+e:a/2*(Math.sqrt(1-(t-=2)*t)+1)+e}