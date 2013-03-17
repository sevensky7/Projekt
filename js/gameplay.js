	    var canvasElement = document.getElementById("canvas");
		var canvas = canvasElement.getContext("2d");
		
		var touchScreen=document.getElementById("touch_screen");
	  
        var canvas_width = canvasElement.width;
        var canvas_height = canvasElement.height;
		
		var nom = document.getElementById("nom");
		var brainPassed = document.getElementById("bump");
		
		
		var paused = document.getElementById("button_pause");
		var right = document.getElementById("button_right");
		var left = document.getElementById("button_left");
		
		var started = document.getElementById("overlay_begin");
		
		var play = document.getElementById("button_play");
		var restart = document.getElementById("button_restart");
		var exit = document.getElementById("button_exit");
		
		
		var zombie_gameplay = document.getElementById("zombie_g");
		
		var choose_zombie = document.getElementById("chooseZombie");

		
		var frenzy_bar = document.getElementById("frenzyBar");
		
		var last_score=document.getElementById("last_score");
		
		var detect = false;
		var open_mouth = false;
		
		var x1 = document.getElementById("x1");
		var x2 = document.getElementById("x2");
		var x3 = document.getElementById("x3");
		
		var lifes = 3;
		var score = 0;
		var isPaused = 1;
		var comboCounter = 0;
		
		var mouseY = 0;
		
		
		
		var scaledHeight = $(window).height();
		var scaledWidth = $(window).width();
		
		var realWidth = canvas_width / scaledWidth;
		
		var realHeight = canvas_height / scaledHeight;
		
		var ratio = realWidth/realHeight;
		
		
		$('p').css('font-size', 500*ratio + '%');
	
		
		 
		
		if (localStorage.getItem(1) === null) {
		  localStorage.setItem(1,0)
		}
				
		var best_score = localStorage.getItem(1);
		
		if (localStorage.getItem(2) === null) {
		  localStorage.setItem(2,0)
		}
		
		if (localStorage.getItem(2) == 0){
		$(zombie_gameplay).css('background-image', 'url(img/zombie1.png)');
		}
		
		if (localStorage.getItem(2) == 1){
		$(zombie_gameplay).css('background-image', 'url(img/zombie3.png)');
		}
		
		
		
		$(play).click(function() {
		isPaused=0;	
		$(started).toggle();
		$(zombie_gameplay).toggleClass("paused"); 
		});
		
		$(restart).click(function() {
		detect=false;
		
		
		
		
		if (localStorage.getItem(2) == 0){
		$(zombie_gameplay).css('background-image', 'url(img/zombie1.png)');
		}
		
		if (localStorage.getItem(2) == 1){
		$(zombie_gameplay).css('background-image', 'url(img/zombie3.png)');
		}
		isPaused=0;	
		
		score=0;
		$(x1).css('visibility','hidden');
		$(x2).css('visibility','hidden');
		$(x3).css('visibility','hidden');
		$(started).toggle();
		$(zombie_gameplay).toggleClass("paused"); 

		});
		
		
		
		$(paused).click(function() {
			isPaused=1;
			$(started).toggle();
			$(play).show();
		    $(exit).show();
			$(zombie_gameplay).toggleClass("paused"); 
		});
		
		
		
		$(right).click(function() {
		$(choose_zombie).css('background-image', 'url(img/zombie3.png)');
		$(zombie_gameplay).css('background-image', 'url(img/zombie3.png)');
		localStorage.setItem(2,1);
		});
		
		$(left).click(function() {
		$(choose_zombie).css('background-image', 'url(img/zombie1.png)');
		$(zombie_gameplay).css('background-image', 'url(img/zombie1.png)');
		localStorage.setItem(2,0);
		});
		
		
		
		/*
		
		
		document.body.addEventListener('touchmove',function(event){ event.preventDefault(); },false);
					function listen(){
						if(touchScreen){
							iphone = ((window.navigator.userAgent.match('iPhone'))||(window.navigator.userAgent.match('iPod')))?true:false;
							ipad = (window.navigator.userAgent.match('iPad'))?true:false;
							if(iphone||ipad){
								touchScreen.addEventListener('touchstart', ev_canvas, false);
								touchScreen.addEventListener('touchend', ev_canvas, false);
								touchScreen.addEventListener('touchmove', ev_canvas, false);
							}
							else{
								touchScreen.addEventListener('mousedown', ev_canvas, false);
								touchScreen.addEventListener('mousemove', ev_canvas, false);
								touchScreen.addEventListener('mouseup',   ev_canvas, false);
							}
						}
					}


					// The general-purpose event handler. This function just determines the mouse position relative to the canvas element.
					function ev_canvas (ev) {
						iphone = ((window.navigator.userAgent.match('iPhone'))||(window.navigator.userAgent.match('iPod')))?true:false;
						ipad = (window.navigator.userAgent.match('iPad'))?true:false;
						if (((iphone)||(ipad))&&(ev.touches[0])){ //iPad
							ev._x = ev.touches[0].clientX;
							ev._y = ev.touches[0].clientY;
						}
						else if (ev.layerX || ev.layerX == 0) { // Firefox
							ev._x = ev.layerX;
							ev._y = ev.layerY;
						}
						else if (ev.offsetX || ev.offsetX == 0) { // Opera
							ev._x = ev.offsetX;
							ev._y = ev.offsetY;
						}
			
					
					}
							
		
		*/
		
		
	
	
	 
	  touchScreen.addEventListener( 'pointerdown', onPointerDown, false );
	  touchScreen.addEventListener( 'pointermove', onPointerMove, false );
	  touchScreen.addEventListener( 'pointerup', onPointerUp, false );
	
	
		function onPointerDown(e) {
		    pointers = e.getPointerList();
			score+=10;
			score_update();
		}

		function onPointerMove(e) {
		  // Prevent the browser from doing its default thing (scroll, zoom)
		  pointers = e.getPointerList();

		  
		  }



		function onPointerUp(e) {
		  pointers = e.getPointerList();
	
	
		}
		
		
	
	

	
	
		
		$(function movements() {
		
		  /*
		  $(touchScreen).bind("mousedown", function(event) {
			detect = true;
			if (localStorage.getItem(2) == 0){
						$(zombie_gameplay).css('background-image', 'url(img/zombie2.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie_gameplay).css('background-image', 'url(img/zombie4.png)');
				}
			
		  });
		  
		  $(touchScreen).bind("mouseup", function(event) {
		  detect = false;
		  if (localStorage.getItem(2) == 0){
						$(zombie_gameplay).css('background-image', 'url(img/zombie1.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie_gameplay).css('background-image', 'url(img/zombie3.png)');
				}
		  event.preventDefault();
			//alert(mouseY);
		  });
		  
		   $(touchScreen).bind("mousemove", function(event) {
			
			mouseY = Math.floor(event.pageY * realHeight);
			if ((detect == true) && (mouseY > 40) && (mouseY < 160)){
			zombie_mouth.y=mouseY;
			$(zombie_gameplay).css('top', event.pageY - scaledHeight/2.1);
			}
		  });
		  
		
		
		
	
		
		$(document).bind("touchmove",function(event){
		return false;
		});
		
		
		  
		  $(touchScreen).bind("touchstart", function(event) {
		  score+=10;
		score_update();
		  return false;
		  });
		  
		  $(touchScreen).bind("touchend", function(event) {
		  return false;
		  });
		  
		   $(touchScreen).bind("touchmove", function(event) {
		   return false;
		  });
		
	*/
		/*
		
		
		var hammer = new Hammer(document.getElementById("touch_screen"));
		
		hammer.ontouch = function(ev) { 
		
		score+=10;
		score_update();
		
		
		};
	
		
		*/
		
		
		
		
		
		
		/*

		  
		  $(touchScreen).bind("touchstart", function(event) {
			detect = true;
			if (localStorage.getItem(2) == 0){
						$(zombie_gameplay).css('background-image', 'url(img/zombie2.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie_gameplay).css('background-image', 'url(img/zombie4.png)');
				}
			return false;
		  });
		  
		  $(touchScreen).bind("touchend", function(event) {
		    detect = false;
		  if (localStorage.getItem(2) == 0){
						$(zombie_gameplay).css('background-image', 'url(img/zombie1.png)');
				}
			if (localStorage.getItem(2) == 1){
						$(zombie_gameplay).css('background-image', 'url(img/zombie3.png)');
				}
		  return false;
		  });
		  
		   $(touchScreen).bind("touchmove", function(event) {
			
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
	
			mouseY = Math.floor(touch.pageY * realHeight);
			
			if ((detect == true) && (mouseY > 40) && (mouseY < 160)){
			zombie_mouth.y=mouseY;
			$(zombie_gameplay).css('top', touch.pageY - scaledHeight/2.1);
			}
			return false;
		  });
		  */
		  
		  
		  
		});
		

		
		window.onload = function(){
	
			paused.on('click', function(){
				if (paused === 0) { 
					paused = 1;
				}
				
				else { 
					 paused = 0;
				}
			});

		};

		
  
	
        var zombie_mouth = {
          color: "#fff",
          x: 55,
          y: 105,
          width: 15,
          height: 38,
		  draw: function() {
            $(canvasElement).drawImage({
			  source: "./img/brain3.png",
			  x: this.x, y: this.y,
			  width:15, height: 38
			});
          }
		  
        };
		
		  /* zombie_mouth.sprite = Sprite("brain3");
        
        zombie_mouth.draw = function() {
          this.sprite.draw(canvas, this.x, this.y);
        };
       */
		
		var wall = {
          color: "#8c9f98",
          x: 0,
          y: 0,
          width: 1,
          height: 480
	
	
		  
        };
		
		
		 var score_update = function() {
			  $(canvasElement).drawText({
			  fillStyle: "#8c9f98",
			  x: 330, y: 10,
			  font: "15pt londrina",
			  text: score.toString()
			});
        };

        var brains = [];
        
        function Brain(I) {
          I = I || {};
        
          I.active = true;
      //    I.age = Math.floor(Math.random() * 32);     
          I.color = "#A2B";
    
          I.x = 400;
          I.y = 87;
          I.xVelocity = -(Math.floor(Math.random() * (5 - 2 + 1)) + 2);


          I.yVelocity = 0;
        
          I.width = 50;
          I.height = 38;
        
          I.inBounds = function() {
            return I.x >= 0 && I.x <= canvas_width &&
              I.y >= 0 && I.y <= canvas_height;
          };
        
          //I.sprite = Sprite("brain2");
        
          I.draw = function() {
             $(canvasElement).drawImage({
			  source: "./img/brain2.png",
			  x: this.x, y: this.y,
			  width:this.width, height: this.height
			});
          };
        
          I.update = function() {
            I.x += I.xVelocity;
            I.y += I.yVelocity;
        
            I.yVelocity = -2.5 * Math.sin(Math.PI / 50);
        
         //   I.age++;
        
            I.active = I.active && I.inBounds();
          };
        
          I.explode = function() {
           
            this.active = false;
    
          };
        
          return I;
        };
		

		
		var brainsfresh = [];
        
        function BrainFresh(F) {
          F = F || {};
        
          F.active = true;
         // F.age = Math.floor(Math.random() * 32);
          
          F.color = "#A2B";
    
          F.x = 400;
          F.y = 87;
          F.xVelocity = -(Math.floor(Math.random() * (5 - 2 + 1)) + 2);


          F.yVelocity = 0;
        
          F.width = 50;
          F.height = 38;
        
          F.inBounds = function() {
            return F.x >= 0 && F.x <= canvas_width &&
              F.y >= 0 && F.y <= canvas_height;
          };
        
          //F.sprite = Sprite("brainfresh");
        
          F.draw = function() {
            $(canvasElement).drawImage({
			  source: "./img/brainfresh.png",
			  x: this.x, y: this.y,
			  width:this.width, height: this.height
			});
          };
        
          F.update = function() {
            F.x += F.xVelocity;
            F.y += F.yVelocity;
        
            F.yVelocity = -2.3 * Math.sin(Math.PI / 50);
        
        //    F.age++;
        
            F.active = F.active && F.inBounds();
          };
        
          F.explode = function() {
           
            this.active = false;
    
          };
        
          return F;
        };
		
		
		
		var candies = [];
        
        function Candy(C) {
          C = C || {};
        
          C.active = true;
      //    C.age = Math.floor(Math.random() * 32);
          
          C.color = "#A2B";
        
          C.x = 400;
          C.y = 87;
          C.xVelocity = -(Math.floor(Math.random() * (5 - 2 + 1)) + 2);
          C.yVelocity = 0;
        
          C.width = 50;
          C.height = 50;
        
          C.inBounds = function() {
            return C.x >= 0 && C.x <= canvas_width &&
              C.y >= 0 && C.y <= canvas_height;
          };
			
		  which_sprite = Math.floor(Math.random() * 2) + 1;
		  
		  if (which_sprite==1){
          C.sprite = "./img/candy.png";
		  }
		  else{
		  C.sprite = "./img/candy2.png";
		  }
        
          C.draw = function() {
            $(canvasElement).drawImage({
			  source: this.sprite,
			  x: this.x, y: this.y,
			  width:this.width, height: this.height
			});
          };
        
          C.update = function() {
            C.x += C.xVelocity;
            C.y += C.yVelocity;
        
			C.yVelocity = -1.7 * Math.sin(Math.PI / 60);
        
      //      C.age++;
        
            C.active = C.active && C.inBounds();
          };
        
          C.explode = function() {
            this.active = false;
          };
		  
		  C.bump = function() {
			C.xVelocity = Math.floor(Math.random() * (5 - 2 + 1)) +5;
          };
        
          return C;
        };
        
     
		
        
		
			 window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 30);
              };
			})();
		
		   
		   
		   
	
	
		
			(function animloop(){
				if(isPaused==0) {
				update();
				draw();
				}
				requestAnimFrame(animloop);
			})();
		
	
		   
		   
		   

		   
     
		
		
        function update() {
          $(last_score).html("Score: " + score + "<br />" + "Best Score: " + localStorage.getItem(1)); 
		
          brains.forEach(function(brain) {
            brain.update();
          });
        
          brains = brains.filter(function(brain) {
            return brain.active;
          });
		  
		  brainsfresh.forEach(function(brainfresh) {
            brainfresh.update();
          });
        
          brainsfresh = brainsfresh.filter(function(brainfresh) {
            return brainfresh.active;
          });
		  
		  candies.forEach(function(candy) {
            candy.update();
          });
        
          candies = candies.filter(function(candy) {
            return candy.active;
          });
        
          handleCollisions();
		  
       
	    if (score < 100){
		  bOccurence=0.007;
		  cOccurence=0.003;
		  bfOccurence=0.001;
		} 
		else if ((score > 100) && (score < 700)){
		  bOccurence=0.009;
		  cOccurence=0.006;
		  bfOccurence=0.002;
		  //zombie_mouth.y+=400;
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
		  bOccurence=0.04;
		  cOccurence=0.009;
		  bfOccurence=0.00;
		  }
		  
		
	
		  
		if(Math.random() < bOccurence) {
			brains.push(Brain());
		}
		  
		  
		if(Math.random() < cOccurence) {
			candies.push(Candy());
		}
		
		if(Math.random() < bfOccurence) {
			brainsfresh.push(BrainFresh());
		}

		  
		 
		if (comboCounter == 0) {
		$(frenzy_bar).css('background-image', 'url(img/0.png)');
		}
		else if (comboCounter == 1) {
		$(frenzy_bar).css('background-image', 'url(img/1.png)');
		}
		else if (comboCounter==2) {
		$(frenzy_bar).css('background-image', 'url(img/2.png)');
		}
		else if (comboCounter==3) {
		$(frenzy_bar).css('background-image', 'url(img/3.png)');
		}
		else if (comboCounter==4) {
		$(frenzy_bar).css('background-image', 'url(img/4.png)');
		}
		else if (comboCounter==5) {
		$(frenzy_bar).css('background-image', 'url(img/5.png)');
		}
		else if (comboCounter==6) {
		$(frenzy_bar).css('background-image', 'url(img/6.png)');
		}
		else if (comboCounter==7) {
		$(frenzy_bar).css('background-image', 'url(img/7.png)');
		}
		else if (comboCounter==8) {
		$(frenzy_bar).css('background-image', 'url(img/8.png)');
		}
		else if (comboCounter==9) {
		$(frenzy_bar).css('background-image', 'url(img/9.png)');
		}
		else if (comboCounter>=10) {
		$(frenzy_bar).css('background-image', 'url(img/10.png)');
		}
	
		
        }
        
		
		

		
        function draw() {
          canvasElement.width = canvasElement.width;
		  score_update();
		  
		  
		  
          brains.forEach(function(brain) {
            brain.draw();
          });
		
		  candies.forEach(function(candy) {
            candy.draw();
          });
		  
		  brainsfresh.forEach(function(brainfresh) {
            brainfresh.draw();
          });
		  
		  zombie_mouth.draw();

        }
        
		
		
		
		
        function collides(a, b) {
          return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
        }
        
		
		
		
        function handleCollisions() {   
        
          brains.forEach(function(brain) {
            if((collides(brain, zombie_mouth)) && (detect==true) ){
			  score+=10;
              brain.explode();
              zombie_mouth.explode();
			  comboCounter+=1;
            }
			if(collides(brain, wall)){
			  if (score > 10){
			  score-=10;
			  comboCounter=0;
              wall.explode();
			  }
            }
          });
		  
		  
		   brainsfresh.forEach(function(brainfresh) {
            if((collides(brainfresh, zombie_mouth)) && (detect==true) ){
			  score+=100;
              brainfresh.explode();
              zombie_mouth.explode();
			  comboCounter+=1;
				candies.forEach(function(candy) {
				candy.xVelocity = 5;
				candy.yVelocity = -10;
			
				});
            }
			if(collides(brainfresh, wall)){
			  if (score > 100){
			  score-=100;
			  comboCounter=0;
              wall.explode();
			  }
            }
          });
		  
		  
		  candies.forEach(function(candy) {
            if((collides(candy, zombie_mouth)) && (detect==true) ){
			  score-=10;
			  candy.explode();
			  zombie_mouth.candy();
			  comboCounter=0;
				/*    $(zombie).animate(
            {"left": "+=150px"},
            "fast");
			  zombie_mouth.x+=15; */
            }
			else if (collides(candy, zombie_mouth)){
			candy.bump();
			}
			if(collides(candy, wall)){
			  candy.explode();
			  }
            
			
          });
		  
		  
		  
		  
		  

        }
        
        zombie_mouth.explode = function() {
          this.active = false;
		  $(nom).fadeIn();
          $(nom).css('visibility', 'visible');
		  $(nom).fadeOut();
		  $(nom).css('visibility', 'false');
        };
		
		wall.explode = function() {
          this.active = false;
		  $(brainPassed).fadeIn();
          $(brainPassed).css('visibility', 'visible');
		  $(brainPassed).fadeOut();
		  $(brainPassed).css('visibility', 'false');
        };

		
		 zombie_mouth.candy = function() {
		
		  this.active = false;
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
		  
		  //if (bestScore < score){
		 // bestScore = score;
		//  }
		
		  if (score > best_score){
		  localStorage.setItem (1, score + 10);
		  best_Score = localStorage.getItem (1, score +10);
		  }
		  
		  
		  score=0;
		  $(x1).fadeToggle();
		  $(x2).fadeToggle();
		  $(x3).fadeToggle();
		  $(play).hide();
		  $(exit).hide();
		  $(zombie_gameplay).toggleClass("paused"); 	
		  
		  }
		 
			
			
		  };
		  
		  
	
			
      
        
		
        