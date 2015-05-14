/* to compile app.js to dist.js: 
	- run npm install  
 	- call webpack app.js dist.js
*/

var loader = require('loader-handle');

setTimeout(function(){
	var app = document.getElementById('app-view');
	app.style.textAlign = 'center';
	app.style.fontSize = '20px';
	app.style.marginTop = '20px';
	app.innerHTML = " Your app is now loaded <br> showing indicator still for few seconds to maybe fetch some initial app data...";
	setTimeout(function(){
		loader.stop(function(){
			app.innerHTML = " Your app is now ready for use";
		})
	},4000);
	
},1000);

