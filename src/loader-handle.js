/*!
 * loader-handle
 * MIT licensed
 *
 * Copyright (C) 2015 Pasi Harju, www.livion.fi
 */

'use strict';
var duration = 300; // in ms
var emitter = new (require('events').EventEmitter)(),		
	elem = document.getElementById('loading-spinner'),	
	stopTimer = null, 
	startTimer = null;

	  // init dom element
var s = elem.style;
	s.opacity = "1";
	s.display = "block";
	s.webkitTransitionProperty = "opacity";
	s.transitionProperty = "opacity";
	s.webkitTransitionDuration = duration + "ms";		
	s.transitionDuration = duration + "ms";			

// Public API
module.exports = {
	start:function (cb){		
		emitter.once('started',function(){							
			if(typeof cb === 'function') { cb(); }
		});
		if(stopTimer){
			clearTimeout(stopTimer);
			stopTimer = null;		
			emitter.emit('stopped');
		}
		if(!startTimer){
			startTimer= setTimeout(function(){
				startTimer = null;			
				emitter.emit('started');
			},duration);
		}
		setTimeout(function(){
			elem.style.display = "block";
			setTimeout(function(){
				elem.style.opacity = "1";		
			},0);			
		},0);		
	},
	stop:function (cb){		
		emitter.once('stopped',function(){							
			elem.style.display = "none";
			if(typeof cb === 'function') { cb(); }
		});
		if(startTimer){
			clearTimeout(startTimer);
			startTimer = null;		
			emitter.emit('started');
		}
		if(!stopTimer){
			stopTimer= setTimeout(function(){
				stopTimer = null;			
				emitter.emit('stopped');
			},duration);
		}
			
		setTimeout(function(){
			elem.style.opacity = "0";				
		},0);
	}
}	