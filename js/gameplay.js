	$(window).load(function() {
	
document.addEventListener("appMobi.device.ready",function(){
        //lock the application in portrait orientation
        AppMobi.device.setRotateOrientation("landscape");
    AppMobi.device.setAutoRotate(false);
	
//var newWidth = AppMobi.display.window.landwidth; 
//alert (newWidth);
    //hide splash screen
    AppMobi.device.hideSplashScreen();  
},false);  

var onDeviceReady=function(){
            AppMobi.device.setRotateOrientation("landscape");
            AppMobi.device.setAutoRotate(true);
            //hide splash screen
            AppMobi.device.hideSplashScreen();  
        };


// grab the DOM elements we want to manipulate
var area = document.getElementById('area');
var level = document.getElementById('level');
var background = document.getElementById('background');
var stats = document.getElementById('stats');
var playbutton = document.getElementById('playbutton');
var mouth = new Mouth();
var zombie = document.getElementById('zombie_dude');
var choose_zombie = document.getElementById("chooseZombie");

//var ua = navigator.userAgent.toLowerCase();
//var isAndroid = ua.indexOf("android");
//var isMobile = ua.indexOf("mobile");




var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};






if(isMobile.any() == null) {
var viewportW =  $('[data-role="page"]').first().width();
var viewportH =  $('[data-role="page"]').first().height();
var scaledHeight = $('[data-role="page"]').first().height();
var scaledWidth = $('[data-role="page"]').first().width();
}
else{
var viewportW =  screen.availWidth;
var viewportH =  screen.availHeight;
var scaledWidth = screen.availWidth;
var scaledHeight = screen.availHeight;
}


alert (viewportW + "  " + viewportH);


var canvasElement = document.getElementById('canvas');
var canvas = canvasElement.getContext("2d")
var canvas_width = canvasElement.width;
var canvas_height = canvasElement.height;
var frenzyBar = document.getElementById("frenzyBar");

var x1 = document.getElementById("x1");
var x2 = document.getElementById("x2");
var x3 = document.getElementById("x3");

var scaleW = scaledWidth / 800;
var scaleH = scaledHeight / 480;


var nom = document.getElementById("nom");
var wipeout = document.getElementById("wipeout");
var frenzy = document.getElementById("frenzy");
var brainPassed = document.getElementById("bump");

var lifes = 3;
var score = 0;
var isPaused = 1;
var comboCounter = 0;


var bOccurence=0;
var cOccurence=0;
var bfOccurence=0;


var paused = document.getElementById("button_pause");
var right = document.getElementById("button_right");
var left = document.getElementById("button_left");
		
var started = document.getElementById("overlay_begin");
		
var play = document.getElementById("button_play");
var restart = document.getElementById("button_restart");
var exit = document.getElementById("button_exit");
		
		
	
	
		
	

		


		
		window.onload = function(){
			paused.on('click', function(){
				if (isPaused === 0) { 
					isPaused = 1;
				}
				
				else { 
					 isPaused = 0;
				}
			});

		};

		


		
   
		   
//----------------------------------------------------------------------------------------------------------------NOWE

		
		
		$(play).click(function() {
		isPaused=0;	
		$(started).toggle();
		$(zombie).toggleClass("paused"); 
		});
		
	$(restart).click(function() {
		detect=false;
		$(started).toggle();
		$(zombie).toggleClass("paused"); 
		
		if (localStorage.getItem(2) == 0){
		$(zombie).css('background-image', 'url(img/zombie1.png)');
		}
		
		if (localStorage.getItem(2) == 1){
		$(zombie).css('background-image', 'url(img/zombie3.png)');
		}
		isPaused=0;	
		score=0;
		$(x1).css('visibility','hidden');
		$(x2).css('visibility','hidden');
		$(x3).css('visibility','hidden');
		
		len = candies.length;
						while (len--){
						candies[len].destroy();
						candies.splice(len,1);
						candyCount--;
		}
		len = brains.length;
						while (len--){
						brains[len].destroy();
						brains.splice(len,1);
						brainCount--;
		}
		len = specials.length;
						while (len--){
						specials[len].destroy();
						specials.splice(len,1);
						specialCount--;
		}
		
		});
		
		
		$(paused).click(function() {
			isPaused=1;
			$(started).toggle();
			$(play).show();
		    $(exit).show();
			$(zombie).toggleClass("paused"); 
		});
		
		
		$(right).click(function() {
		$(choose_zombie).css('background-image', 'url(img/zombie3.png)');
		$(zombie).css('background-image', 'url(img/zombie3.png)');
		localStorage.setItem(2,1);
		});
		
		$(left).click(function() {
		$(choose_zombie).css('background-image', 'url(img/zombie1.png)');
		$(zombie).css('background-image', 'url(img/zombie1.png)');
		localStorage.setItem(2,0);
		});
		
		

				
//----------------------------------------------NAVIGATION

var detect = false;	


var ratio = scaledWidth / scaledHeight;
//alert (ratio);

var support = Math.round(1.3*mouth.height*ratio);

 $(area).bind("mousemove", function(event) {	
			if (detect == true){
			mouth.y=event.pageY;
			$(zombie).css('top', mouth.y - support);
			}
		  });
 $(area).bind("mousedown", function(event) {	
			detect = true;
			if (localStorage.getItem(2) == 0){
						$(zombie).css('background-image', 'url(img/zombie2.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie).css('background-image', 'url(img/zombie4.png)');
				}
		  });
 $(area).bind("mouseup", function(event) {	
			detect = false;
			if (localStorage.getItem(2) == 0){
						$(zombie).css('background-image', 'url(img/zombie1.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie).css('background-image', 'url(img/zombie3.png)');
				}
		  });
		 
 $(area).bind("touchmove", function(event) {	
			event.preventDefault();

		    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
			if (detect == true){
			mouseY = Math.floor(touch.pageY);
			mouth.y=mouseY;
			$(zombie).css('top', mouth.y - support);
			}
		  });

$(area).bind("touchstart", function(event) {	
			event.preventDefault();
			detect = true;
			if (localStorage.getItem(2) == 0){
						$(zombie).css('background-image', 'url(img/zombie2.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie).css('background-image', 'url(img/zombie4.png)');
				}
		  });
		  
$(area).bind("touchend", function(event) {	
			event.preventDefault();
			detect = false;
			if (localStorage.getItem(2) == 0){
						$(zombie).css('background-image', 'url(img/zombie1.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie).css('background-image', 'url(img/zombie3.png)');
				}

		  });


//---------------------------------------------VISUAL OF ZOMBIE

	if (localStorage.getItem(1) === null) {
		  localStorage.setItem(1,0)
		}
				
		var best_score = localStorage.getItem(1);
		
		if (localStorage.getItem(2) === null) {
		  localStorage.setItem(2,0)
		}
		
		if (localStorage.getItem(2) == 0){
		$(zombie).css('background-image', 'url(img/zombie1.png)');
		}
		
		if (localStorage.getItem(2) == 1){
		$(zombie).css('background-image', 'url(img/zombie3.png)');
		}		  
		  
//---------------------------------------------SCORE

var score_update = function() {
			  canvas.clearRect(0, 0, canvas_width, canvas_height);
			  $(canvasElement).drawText({
			  fillStyle: "#8c9f98",
			  x: 1, y: 1, fromCenter: false,
			  font: "50pt londrina",
			  text: score.toString()
			});
        };		  
		  
		  	  
		  
//----------------------------------------------COLLISION DETECTION	 
		  
 function collides(a, b) {
          return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
        }
		
function handleCollisions(){
var j =0;
if (j< brains.length) {

		for (var i = 0; i < brains.length; ++i) {
			 if((detect == true) && (collides(brains[i],mouth)) && (brains[i].active == true)){
					   brains[i].active = false;
					   brains[i].style.visibility="hidden";
					   score+=10;
					   comboCounter+=1;
					    $(nom).fadeIn();
						 $(nom).css('visibility', 'visible');
						 $(nom).fadeOut();
						 $(nom).css('visibility', 'false');
					}
		}
}

if (j< specials.length) {

		for (var i = 0; i < specials.length; ++i) {
			 if((detect == true) && (collides(specials[i],mouth)) && (specials[i].active == true)){
					   specials[i].active = false;
					   specials[i].style.visibility="hidden";
					   score+=150;
					   comboCounter+=1;
					   $(wipeout).fadeIn('slow');
					   $(wipeout).css('visibility', 'visible');
					   $(wipeout).fadeOut('slow');
					   $(wipeout).css('visibility', 'false');
					   len = candies.length;
						while (len--){
						candies[len].destroy();
						candies.splice(len,1);
						candyCount--;
						}
					}
		}
}

if (j< candies.length) {

		for (var i = 0; i < candies.length; ++i) {
			 if((detect == true) && (collides(candies[i],mouth)) && (candies[i].active == true)){
					   candies[i].active = false;
					   candies[i].style.visibility="hidden";
					   score-=10;
					   comboCounter=0;
					     if (lifes == 3){
						  $(x1).fadeIn();
						  $(x1).css('visibility', 'visible');
						  lifes-=1;
						  }
						  else if (lifes ==2){
							  $(x2).fadeIn();
							  $(x2).css('visibility', 'visible');
							  lifes-=1;
						  }
						  else if (lifes ==1){
							  $(x3).fadeIn();
							  $(x3).css('visibility', 'visible');
							  isPaused=1;
							  $(started).fadeToggle();
							  lifes=3;
							  
							  if (score > best_score){
							  localStorage.setItem (1, score + 10);
							  best_Score = localStorage.getItem (1, score +10);
							  }
							  
							  
							  score=0;
							  $(x1).fadeToggle();
							  $(x2).fadeToggle();
							  $(x3).fadeToggle();
							  //$(play).hide();
							  //$(exit).hide();
							  //$(zombie_gameplay).toggleClass("paused"); 			  
						  }
					}
		}
}

}
// size of the the area and the larger level within


//alert(viewportW + " " + viewportH);
// sprite batches - one for moving brains 
// and another for static level geometry
var brains = [];
var brainCount = 0;

var candies = [];
var candyCount = 0;

var specials = [];
var specialCount = 0;

// can this web brower handle CSS3 transforms (to trigger HW accel?)
var has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
if (window.console) console.log ('Browser is capable of CSS3 transform3d:'+has3d);
// but should we use it?
var use3d = false;

// ensure that we have requestAnimationFrame
// this is Paul Irish's compatibility shim
if (!window.requestAnimationFrame) 
{
	window.requestAnimationFrame = (function() 
	{
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback,element) 
		{
			window.setTimeout(callback, 1000 / 60);
		};
	})();
}

// add or remove brains depending on the FPS
function addBrain()
{
			// add one new animated sprite
			brains[brainCount] = new Sprite();
			brainCount++;
}

function addCandy()
{
			// add one new animated sprite
			candies[candyCount] = new Sprite2();
			candyCount++;
}

function addSpecial()
{
			// add one new animated sprite
			specials[specialCount] = new SpecialBrain();
			specialCount++;
}

// measure the framerate and add/remove brains
// depending on how fast we're animating
function addItems() 
{
		// add more brains if possible
		// only done once per second so we aren't touching
		// the DOM every single frame
	if(brainCount < 30){
		if(Math.random() < bOccurence) {
			//brains.push(Brain());
			addBrain();
		}
		
		if(specialCount < 1){
		if(Math.random() < bfOccurence) {
			//brains.push(Brain());
			addSpecial();
		}
		}
		
		if(candyCount < 5){
		if(Math.random() < cOccurence) {
			//brains.push(Brain());
			addCandy();
		}
		}
	}
	
}

// update the style as needed
function repositionSprite()
{
	if (!this) return;
	// CSS3 version - forces hardware accel on mobile
	// Surprisingly, this is SLOWER on PC Windows using Chrome	
	// but may be faster on iOS and other mobile platforms
	if (use3d && has3d)
	{
		this.style.webkitTransform = 'translate3d('+this.x+'px,'+this.y+'px,0px)';
	}
	else
	{
		this.style.left = (this.x) + 'px';
		this.style.top = this.y + 'px';
	}
}

// changes the spritesheet frame of a sprite
// by shifting the background image location
function changeSpriteFrame(num)
{
	if (!this) return;
	this.style.background = "url('brain2.png') no-repeat";
	this.style.backgroundSize="100% 100%";
}

// removes a sprite from a container DOM element
function destroySprite()
{
	if (!this) return;
	this.parent.removeChild(this.element);
}



// the sprite class - DOM sprite version
function Sprite(parentElement)
{
	// function references
	this.reposition = repositionSprite;
	//this.frame = changeSpriteFrame;
	this.destroy = destroySprite;
	// where do this sprite live? (default: area)
	this.parent = parentElement ? parentElement : area;
	// create a DOM sprite
	this.element = document.createElement("div");
	this.element.className = 'brain';
	// optimized pointer to style object
	this.style = this.element.style;
	// random starting position
// regular sprite in the area
	
		this.x = viewportW;
		//alert(this.x);
		this.y = Math.round(viewportH/2);

		//scaledHeight = $('[data-role="page"]').first().height();
		//scaledWidth = $('[data-role="page"]').first().width();
		
		this.width=Math.round(scaledWidth*0.13);
		this.height=Math.round(scaledHeight*0.16);
		
		this.age = Math.round(Math.random() * 32);
		
		this.active = true;
		
	this.reposition();
	// give it a random speed
	this.xSpeed = -(Math.round(Math.random() * (5 - 2 + 1)) + 2);
	this.ySpeed = 0;
	// random spritesheet frame
	//this.frame(brainCount);
	// put it into the game window
	this.parent.appendChild(this.element);
}

function SpecialBrain(parentElement)
{

	this.reposition = repositionSprite;
	this.destroy = destroySprite;
	this.parent = parentElement ? parentElement : area;
	this.element = document.createElement("div");
	this.element.className = 'special';
	this.style = this.element.style;
	
	this.x = viewportW;
	this.y = Math.round(viewportH/2);

	//scaledHeight = $('[data-role="page"]').first().height();
	//scaledWidth = $('[data-role="page"]').first().width();
		
	this.width=Math.round(scaledWidth*0.13);
	this.height=Math.round(scaledHeight*0.16);
		
	this.age = Math.round(Math.random() * 32);
		
	this.active = true;
		
	this.reposition();

	this.xSpeed = -(Math.round(Math.random() * (8 - 2 + 1)) + 4);
	this.ySpeed = 0;

	this.parent.appendChild(this.element);
}


function Sprite2(parentElement)
{
	// function references
	this.reposition = repositionSprite;
	//this.frame = changeSpriteFrame;
	this.destroy = destroySprite;
	// where do this sprite live? (default: area)
	this.parent = parentElement ? parentElement : area;
	// create a DOM sprite
	this.element = document.createElement("div");
	this.element.className = 'candy';
	// optimized pointer to style object
	this.style = this.element.style;
	// random starting position
// regular sprite in the area

		which_sprite = Math.floor(Math.random() * 2) + 1;
		  
		  if (which_sprite==1){
          this.style.background = "url('img/candy.png') no-repeat";
		  this.style.backgroundSize="100% 100%";
		  }
		  else{
		  this.style.background = "url('img/candy2.png') no-repeat";
		  this.style.backgroundSize="100% 100%";
		  }
	
		this.x = viewportW;
		this.y = Math.round(viewportH/2);

	//	scaledHeight = $('[data-role="page"]').first().height();
	//	scaledWidth = $('[data-role="page"]').first().width();
		
		this.width=Math.round(scaledWidth*0.12);
		this.height=Math.round(scaledHeight*0.19);
		
		this.age = Math.round(Math.random() * 32);
		
		this.active = true;
		
	this.reposition();
	// give it a random speed
	this.xSpeed = -(Math.round(Math.random() * (8 - 2 + 1)) + 2);
	this.ySpeed = 0;
	// random spritesheet frame
	//this.frame(brainCount);
	// put it into the game window
	this.parent.appendChild(this.element);
}



function Mouth(parentElement)
{
	this.reposition = repositionSprite;
	// where do this sprite live? (default: area)
	this.parent = parentElement ? parentElement : area;
	// create a DOM sprite
	this.element = document.createElement("div");
	this.element.className = 'mouth';
	// optimized pointer to style object
	this.style = this.element.style;
	// random starting position
// regular sprite in the area
	
		scaledHeight = $('[data-role="page"]').first().height();
		scaledWidth = $('[data-role="page"]').first().width();
	
		this.x = Math.round(scaledWidth*0.14);
		this.y = Math.round(viewportH/2);
		
		this.width=Math.round(scaledWidth*0.02);
		this.height=Math.round(scaledHeight*0.2);
		
		this.reposition();
	// put it into the game window
	this.parent.appendChild(this.element);
}




//---------------------------------------------------MOVEMENT

// update the positions of each sprite
function animateSprites()
{
	for (var loop=0; loop < brainCount; loop++)
	{
	
		brains[loop].ySpeed = Math.round( -2.3 * Math.sin(brains[loop].age * Math.PI / 50));
		brains[loop].age++;
		
		brains[loop].x += brains[loop].xSpeed;
		brains[loop].y += brains[loop].ySpeed;

		brains[loop].reposition();	
	}
	
	
	for (var loop=0; loop < specialCount; loop++)
	{
	
		specials[loop].ySpeed = Math.round( -2.3 * Math.sin(specials[loop].age * Math.PI / 50));
		specials[loop].age++;
		
		specials[loop].x += specials[loop].xSpeed;
		specials[loop].y += specials[loop].ySpeed;

		specials[loop].reposition();	
	}
	
	
	for (var loop=0; loop < candyCount; loop++)
	{
	
		candies[loop].ySpeed = Math.round( -1.7 * Math.sin(candies[loop].age * Math.PI / 120));
		candies[loop].age++;
		
		candies[loop].x += candies[loop].xSpeed;
		candies[loop].y += candies[loop].ySpeed;

		candies[loop].reposition();	
	}
}


//----------------------------------------------------CLEAR UNUSED SPRITES

function clearSprites()
{
var len = brains.length;

	while (len--) {

			if (brains[len].x < 0){
			if (brains[len].active == true)
			{
			comboCounter=0;
			$(brainPassed).fadeIn();
					  $(brainPassed).css('visibility', 'visible');
					  $(brainPassed).fadeOut();
					  $(brainPassed).css('visibility', 'false');
			}
					brains[len].destroy();
					brains.splice(len,1);
					brainCount--;

			}
	}
	
len = candies.length;

	while (len--){
		if (candies[len].x < 0){
					candies[len].destroy();
					candies.splice(len,1);
					candyCount--;
			}
	}

len = specials.length;

	while (len--){
		if (specials[len].x < 0){
					specials[len].destroy();
					specials.splice(len,1);
					specialCount--;
			}
	}
	
}

//--------------------------------------------------------------DIFFICULTY

function difficulty()
{
   if (score < 100){
		  bOccurence=0.007;
		  cOccurence=0.003;
		  bfOccurence=0.001;
		} 
		else if ((score > 100) && (score < 700)){
		  bOccurence=0.009;
		  cOccurence=0.006;
		  bfOccurence=0.002;
		} 
		else if ((score > 700) && (score < 1500)){
		  bOccurence=0.011;
		  cOccurence=0.008;
		  bfOccurence=0.003;
		} 
		else if ((score > 1500) && (score < 2200)){
		  bOccurence=0.013;
		  cOccurence=0.018;
		  bfOccurence=0.005;
		} 
		else if ((score > 2200) && (score < 3000)){
		  bOccurence=0.016;
		  cOccurence=0.021;
		  bfOccurence=0.006;
		} 
		else if (score > 3000){
		  bOccurence=0.024;
		  cOccurence=0.035;
		  bfOccurence=0.007;
		} 
		
		if (comboCounter >= 10){
		  $(frenzy).fadeIn('slow');
		  $(frenzy).css('visibility', 'visible');
		  bOccurence=0.04;
		  cOccurence=0.009;
		  bfOccurence=0.00;
		  }
	
	
		if (comboCounter == 0) {
		 $(frenzy).fadeOut('slow');
		  $(frenzy).css('visibility', 'false');
		$(frenzyBar).css('background-image', 'url(img/0.png)');
		}
		else if (comboCounter == 1) {
		$(frenzyBar).css('background-image', 'url(img/1.png)');
		}
		else if (comboCounter==2) {
		$(frenzyBar).css('background-image', 'url(img/2.png)');
		}
		else if (comboCounter==3) {
		$(frenzyBar).css('background-image', 'url(img/3.png)');
		}
		else if (comboCounter==4) {
		$(frenzyBar).css('background-image', 'url(img/4.png)');
		}
		else if (comboCounter==5) {
		$(frenzyBar).css('background-image', 'url(img/5.png)');
		}
		else if (comboCounter==6) {
		$(frenzyBar).css('background-image', 'url(img/6.png)');
		}
		else if (comboCounter==7) {
		$(frenzyBar).css('background-image', 'url(img/7.png)');
		}
		else if (comboCounter==8) {
		$(frenzyBar).css('background-image', 'url(img/8.png)');
		}
		else if (comboCounter==9) {
		$(frenzyBar).css('background-image', 'url(img/9.png)');
		}
		else if (comboCounter>=10) {
		$(frenzyBar).css('background-image', 'url(img/10.png)');
		}
	
}




// run each frame
(function animate() 
{
requestAnimationFrame(animate);
if (isPaused == 0){
	// call this function again asap
	
	// measure time and add or remove brains
	addItems();
	handleCollisions();
	// bounce the brains around and scroll the level
	animateSprites();
	clearSprites();
    //$(stats).html("Score: " + score); 
	mouth.reposition();
	score_update();
	difficulty();
	//$(last_score).html("Score: " + score + "<br />" + "Best Score: " + localStorage.getItem(1)); 
}
})();

// start your engines!
function startBenchmark()
{
if (isPaused == 1){
isPaused = 0;
playbutton.style.display="none";
}
else{
isPaused = 1;
playbutton.style.display="none";
}
}		   

	
		   
		   	

	
});
	
			
      
        
		
        