	    var canvasElement = document.getElementById("canvas");
		var canvas = canvasElement.getContext("2d");
	  
        var canvas_width = canvasElement.width;
        var canvas_height = canvasElement.height;
       
		var score = 0;
		var paused = 0;
		
		$(function() {
		  
		  $(document).bind("mousedown", function(event) {
			detect = true;
		  });
		  
		  $(document).bind("mouseup", function(event) {
			detect = false;
		  });
		  
		  $(document).bind("touchstart", function(event) {
			detect = true;
		  });
		  
		  $(document).bind("touchend", function(event) {
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
          x: 110,
          y: 210,
          width: 100,
          height: 120,
          draw: function() {
            canvas.fillStyle = this.color;
            canvas.fillRect(this.x, this.y, this.width, this.height);
			canvas.font = '30px londrina';
			canvas.fillText(score.toString() , 640, 30);
			
          }
        };

        var brains = [];
		
		

        
        function Brain(I) {
          I = I || {};
        
          I.active = true;
          I.age = Math.floor(Math.random() * 64);
          
          I.color = "#A2B";
        
          I.x = 800;
          I.y = 170;
          I.xVelocity = -5;
          I.yVelocity = 0;
        
          I.width = 100;
          I.height = 87;
        
          I.inBounds = function() {
            return I.x >= 0 && I.x <= canvas_width &&
              I.y >= 0 && I.y <= canvas_height;
          };
        
          I.sprite = Sprite("brain");
        
          I.draw = function() {
            this.sprite.draw(canvas, this.x, this.y);
          };
        
          I.update = function() {
            I.x += I.xVelocity;
            I.y += I.yVelocity;
        
            I.yVelocity = 1 * Math.sin(I.age * Math.PI / 64);
        
            I.age++;
        
            I.active = I.active && I.inBounds();
          };
        
          I.explode = function() {
           
            this.active = false;
            // Extra Credit: Add an explosion graphic
          };
        
          return I;
        };
        
     
		
        
		
			 window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
			})();
		
		   
		   
		   
	
	
		if(paused==0) {
			(function animloop(){
				requestAnimFrame(animloop);
				update();
				draw();
			})();
		}
	
		   
		   
		   

		   
     
		
		
        function update() {
            
          brains.forEach(function(brain) {
            brain.update();
          });
        
          brains = brains.filter(function(brain) {
            return brain.active;
          });
        
          handleCollisions();
        
          if(Math.random() < 0.005) {
            brains.push(Brain());
          }
        }
        
        
        zombie_mouth.midpoint = function() {
          return {
            x: this.x + this.width/2,
            y: this.y + this.height/2
          };
        };
        
        function draw() {
          canvas.clearRect(0, 0, canvas_width, canvas_height);
          zombie_mouth.draw();
          
		  
        
          brains.forEach(function(brain) {
            brain.draw();
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
        }
        
        zombie_mouth.explode = function() {
          this.active = false;
          // Extra Credit: Add an explosion graphic and then end the game
        };
        
        