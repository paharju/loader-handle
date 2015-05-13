/*!
 * LvLoadingSpinner
 * MIT licensed
 *
 * Copyright (C) 2015 Pasi Harju, www.livion.fi
 */
/* jshint node:true, browser:true */

(function( root, factory ) {
 'use strict';

 var animDuration = 300; // in ms
  /* CommonJS */
  if (typeof exports === 'object')  { module.exports = factory(animDuration); }

  /* AMD module */
  else if (typeof define === 'function' && define.amd) { define(factory); }

  /* Browser global */
  else { root.loaderHandle = factory(); }


  // init dom element
var s = document.getElementById('loading-spinner').style;
	s.opacity = "1";
	s.display = "block";
	s.webkitTransitionProperty = "opacity";
	s.transitionProperty = "opacity";
	s.webkitTransitionDuration = animDuration + "ms";		
	s.transitionDuration = animDuration + "ms";		

}
(this, function(duration) {
	'use strict';
	var EventEmitter = require('events').EventEmitter,
		eventEmitter = new EventEmitter(),
		elem = document.getElementById('loading-spinner'),
		stopTimer = null, 
		startTimer = null;	

	var start = function (cb){		
		eventEmitter.once('started',function(){							
			if(typeof cb === 'function') { cb(); }
		});
		if(stopTimer){
			clearTimeout(stopTimer);
			stopTimer = null;		
			eventEmitter.emit('stopped');
		}
		if(!startTimer){
			startTimer= setTimeout(function(){
				startTimer = null;			
				eventEmitter.emit('started');
			},duration);
		}
		setTimeout(function(){
			elem.style.display = "block";
			setTimeout(function(){
				elem.style.opacity = "1";		
			},0);			
		});
		
	};

	var stop = function (cb){		
		eventEmitter.once('stopped',function(){							
			elem.style.display = "none";
			if(typeof cb === 'function') { cb(); }
		});
		if(startTimer){
			clearTimeout(startTimer);
			startTimer = null;		
			eventEmitter.emit('started');
		}
		if(!stopTimer){
			stopTimer= setTimeout(function(){
				stopTimer = null;			
				eventEmitter.emit('stopped');
			},duration);
		}
			
		setTimeout(function(){
			elem.style.opacity = "0";				
		});

	};


	// Public API
	return {
		stop: stop,
		start: start		
	};
}));