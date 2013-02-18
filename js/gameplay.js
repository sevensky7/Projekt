	    var canvasElement = document.getElementById("canvas");
		var canvas = canvasElement.getContext("2d");
	  
        var canvas_width = canvasElement.width;
        var canvas_height = canvasElement.height;
		
		var nom = document.getElementById("nom");
		
		
		var paused = document.getElementById("button_pause");
		var right = document.getElementById("button_right");
		var left = document.getElementById("button_left");
		
		var started = document.getElementById("overlay_begin");
		
		var play = document.getElementById("button_play");
		var restart = document.getElementById("button_restart");
		var exit = document.getElementById("button_exit");
		
		var zombie = document.getElementById("zombie_gameplay");
		
		var detect = false;
		var open_mouth = false;
		
		var x1 = document.getElementById("x1");
		var x2 = document.getElementById("x2");
		var x3 = document.getElementById("x3");
		
		var lifes = 3;
       
		var score = 0;
		var isPaused = 1;
		
		$(play).click(function() {
		isPaused=0;	
		$(started).toggle();
		$(zombie_gameplay).toggleClass("paused"); 
		});
		
		$(restart).click(function() {
		isPaused=0;	
		canvas.clearRect(0, 0, canvas_width, canvas_height);
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
		$(zombie).css('background-image', 'url(img/zombie3.png)');
		});
		
		$(left).click(function() {
		$(zombie).css('background-image', 'url(img/zombie1.png)');
		});
		
		
		
		
		
		
		$(function() {
		  
		  $(canvasElement).bind("mousedown", function(event) {
			detect = true;
		  });
		  
		  $(canvasElement).bind("mouseup", function(event) {
		  event.preventDefault();
			detect = false;
		  });
		  
		  $(canvasElement).bind("touchstart", function(event) {
			detect = true;
		  });
		  
		  $(canvasElement).bind("touchend", function(event) {
		  event.preventDefault();
			detect = false;
		  });
		  
		});
		
		
		
		window.onload = function(){
			document.getElementById('button_pause').on('click', function(){
				if (paused === 0) { 
					paused = 1;
				}
				
				else { 
					 paused = 0;
				}
			});

		};

		
  
	
        var zombie_mouth = {
          color: "#8c9f98",
          x: 55,
          y: 105,
          width: 20,
          height: 60
		  
        };
		
		
		 var score_update = function() {
			  $(canvasElement).drawText({
			  fillStyle: "#8c9f98",
			  x: 320, y: 10,
			  font: "15pt londrina",
			  text: score.toString()
			});
        };

        var brains = [];
        
        function Brain(I) {
          I = I || {};
        
          I.active = true;
          I.age = Math.floor(Math.random() * 32);
          
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
        
          I.sprite = Sprite("brain2");
        
          I.draw = function() {
            this.sprite.draw(canvas, this.x, this.y);
          };
        
          I.update = function() {
            I.x += I.xVelocity;
            I.y += I.yVelocity;
        
            I.yVelocity = 1 * Math.sin(I.age * Math.PI / 32);
        
            I.age++;
        
            I.active = I.active && I.inBounds();
          };
        
          I.explode = function() {
           
            this.active = false;
            // Extra Credit: Add an explosion graphic
          };
        
          return I;
        };
		
		
		
		var candies = [];
        
        function Candy(C) {
          C = C || {};
        
          C.active = true;
          C.age = Math.floor(Math.random() * 32);
          
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
          C.sprite = Sprite("candy2");
		  }
		  else{
		  C.sprite = Sprite("candy");
		  }
        
          C.draw = function() {
            this.sprite.draw(canvas, this.x, this.y);
          };
        
          C.update = function() {
            C.x += C.xVelocity;
            C.y += C.yVelocity;
        
            C.yVelocity = 1 * Math.sin(C.age * Math.PI / 32);
        
            C.age++;
        
            C.active = C.active && C.inBounds();
          };
        
          C.explode = function() {
            this.active = false;
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
				requestAnimFrame(animloop);
				if(isPaused==0) {
				canvas.clearRect(0, 0, canvas_width, canvas_height);
				update();
				draw();
				}
			})();
		
	
		   
		   
		   

		   
     
		
		
        function update() {
           
			
          brains.forEach(function(brain) {
            brain.update();
          });
        
          brains = brains.filter(function(brain) {
            return brain.active;
          });
		  
		  candies.forEach(function(candy) {
            candy.update();
          });
        
          candies = candies.filter(function(candy) {
            return candy.active;
          });
        
          handleCollisions();
        
          if(Math.random() < 0.007) {
            brains.push(Brain());
          }
		  
		  if(Math.random() < 0.006) {
            candies.push(Candy());
          }
        }
        
        
        zombie_mouth.midpoint = function() {
          return {
            x: this.x + this.width/2,
            y: this.y + this.height/2
          };
        };
		
		

		
        function draw() {
          
		  score_update();
		  
          brains.forEach(function(brain) {
            brain.draw();
          });
		
		  candies.forEach(function(candy) {
            candy.draw();
          });
		 
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
            }
          });
		  
		  candies.forEach(function(candy) {
            if((collides(candy, zombie_mouth)) && (detect==true) ){
			  score-=10;
			  candy.explode();
			  zombie_mouth.candy();
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
		  score=0;
		  $(x1).fadeToggle();
		  $(x2).fadeToggle();
		  $(x3).fadeToggle();
		  $(play).hide();
		  $(exit).hide();
		  $(zombie_gameplay).toggleClass("paused"); 
			
		  }
		 
			
			
		  };
      
        
		
        