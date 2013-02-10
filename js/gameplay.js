	    var canvasElement = document.getElementById("canvas");
		var canvas = canvasElement.getContext("2d");
	  
        var canvas_width = canvasElement.width;
        var canvas_height = canvasElement.height;
		
		var nom = document.getElementById("nom");
		var paused = document.getElementById("button_pause");
		
		var detect = false;
		
		var x1 = document.getElementById("x1");
		var x2 = document.getElementById("x2");
		var x3 = document.getElementById("x3");
		
		var lifes = 3;
       
		var score = 0;
		var isPaused = 0;
		
		$(paused).click(function() {
		if (isPaused==0){
		isPaused=1;
		}
		else{
		isPaused=0;
		}
		});
		
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
          x: 80,
          y: 210,
          width: 100,
          height: 120,
          draw: function() {
            canvas.fillStyle = this.color;
            //canvas.fillRect(this.x, this.y, this.width, this.height);
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
		
		
		
		var candies = [];
        
        function Candy(C) {
          C = C || {};
        
          C.active = true;
          C.age = Math.floor(Math.random() * 64);
          
          C.color = "#A2B";
        
          C.x = 800;
          C.y = 170;
          C.xVelocity = -5;
          C.yVelocity = 0;
        
          C.width = 100;
          C.height = 100;
        
          C.inBounds = function() {
            return C.x >= 0 && C.x <= canvas_width &&
              C.y >= 0 && C.y <= canvas_height;
          };
        
          C.sprite = Sprite("candy");
        
          C.draw = function() {
            this.sprite.draw(canvas, this.x, this.y);
          };
        
          C.update = function() {
            C.x += C.xVelocity;
            C.y += C.yVelocity;
        
            C.yVelocity = 1 * Math.sin(C.age * Math.PI / 64);
        
            C.age++;
        
            C.active = C.active && C.inBounds();
          };
        
          C.explode = function() {
           
            this.active = false;
            // Extra Credit: Add an explosion graphic
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
                window.setTimeout(callback, 1000 / 60);
              };
			})();
		
		   
		   
		   
	
	
		
			(function animloop(){
				requestAnimFrame(animloop);
				if(isPaused==0) {
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
        
          if(Math.random() < 0.005) {
            brains.push(Brain());
          }
		  
		  if(Math.random() < 0.002) {
            candies.push(Candy());
          }
        }
        
        
        zombie_mouth.midpoint = function() {
          return {
            x: this.x + this.width/2,
            y: this.y + this.height/2
          };
        };
		
		
		
        //zombie_mouth.draw();
		
		
        function draw() {
          canvas.clearRect(0, 0, canvas_width, canvas_height);

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
		  if (lifes == 3){
          this.active = false;
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
		  lifes-=1;
		  }
        };
        
        