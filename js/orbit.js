'use strict';

// // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// // requestAnimationFrame polyfill by Erik M�ller
// // fixes from Paul Irish and Tino Zijdel
// (function() {
//    var lastTime = 0;
//    var vendors = ['ms', 'moz', 'webkit', 'o'];
//    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//       window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//       window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
//    }

//    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
// 		var currTime = new Date().getTime();
// 		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		
// 		var id = window.setTimeout(function() { 
// 			callback(currTime + timeToCall);
// 		  }, timeToCall);
		
// 		lastTime = currTime + timeToCall;
// 		return id;
//    };

//    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
//       clearTimeout(id);
//     };
// }());


/////////////////////////////////////////////////////////////////
//	CONSTANTS
///////////////////////////////////////////////////////////////// 
var FPS = 60;
var ANIMATION_INTERVAL = 1000 / FPS;


/////////////////////////////////////////////////////////////////
//	FUNCTIONS
/////////////////////////////////////////////////////////////////

function Planet(selector, radiusX, radiusY, centerX, centerY, speed, pathRotation) {
	this.ID = selector;
	this.RadiusX = radiusX;
	this.RadiusY = radiusY;
	this.Speed = speed;
	this.CenterX = centerX;
	this.CenterY = centerY;
	this.Speed = speed;
	this.timeOutID = null;
	this.theta = 0;
	this.PathRotation = (typeof pathRotation !== 'undefined') ? pathRotation : 0;
}

//	SetOrbit
//	Sets a planet in motion based on its properties
//	planet: (Planet Object) A planet to animate
function SetOrbit(planet) {
	clearTimeout(planet.timeOutID);
   this.timeOutID = setTimeout(function() {
		SetOrbit(planet);
		
		planet.theta += planet.Speed;		//TODO: mod theta to stay within range
		
		//	Get Element coordinates
		var coordinates = EllipsePath(
									planet.RadiusX, 
									planet.RadiusY, 
									planet.theta, 
									planet.CenterX, 
									planet.CenterY,
									planet.PathRotation
								);
				
		//	Set Element coordinates
		$(planet.ID).css('left', coordinates.X + 'px');
		$(planet.ID).css('top', coordinates.Y + 'px');	
	}, ANIMATION_INTERVAL);
}

function Tuple(x, y) {
	this.X = x;
	this.Y = y;
}

//	EllipsePath
//	Gets the X, Y coordinates for an elliptical path based on the input parameters
//	
//	Returns: (Tuple) A Tuple with the X, Y coordinates
function EllipsePath(radiusX, radiusY, theta, centerX, centerY, rotation) {
	var x = radiusX * Math.cos(theta);
	var y = radiusY * Math.sin(theta);
	
	//Rotation Ellipse by rotation
	if (rotation != 0) {
		var _x = x*Math.cos(rotation) - y*Math.sin(rotation);
		var _y = x*Math.sin(rotation) + y*Math.cos(rotation);
		x = _x;
		y = _y;
	}
	
	//Return ellipse X,Y displaced by the centerX, centerY
	return new Tuple(x + centerX, y + centerY);
}

//	GetWindowCenter
//	Gets the center of the current window;
// function GetWindowCenter() {
// 	var centerX = $(window).innerWidth() / 2;
// 	var centerY = $(window).innerHeight() / 2;
// 	return new Tuple(centerX, centerY);
// }

//	GetElementCenter
//	Gets the coordinates of the center of an element
function GetElementCenter(id) {
	return new Tuple($(id).innerWidth() / 2, $(id).innerHeight() / 2)
}

//	GetCenterInWindow
//	Gets the X,Y coordinates of the center of an element with respect to the center of the window.
function GetCenterInWindow(id) {
	//var windowCenter = GetWindowCenter();
	var elementCenter = GetElementCenter(id);
		
	return new Tuple(elementCenter.X, elementCenter.Y);
}


$(function () {
	var center = GetCenterInWindow("#sol");
	var bluePlanet = new Planet('#bluePlanet', 80, 80, center.X, center.Y, Math.PI / 360);
	//SetOrbit(bluePlanet);
	
	var greenPlanet = new Planet("#greenPlanet", 170, 120, center.X, center.Y, Math.PI / 225);
	//SetOrbit(greenPlanet);
	
	// //	Handles Resize Events
	// $(window).resize(function() {
	// 	//	Re-centers the orbits
	// 	var center = GetCenterInWindow("#sol");
	// 	bluePlanet.CenterX = center.X;
	// 	bluePlanet.CenterY = center.Y;
	// 	greenPlanet.CenterX = center.X;
	// 	greenPlanet.CenterY = center.Y;
	// });
});

