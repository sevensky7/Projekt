	    var canvasElement = document.getElementById("canvas");
		var canvas = canvasElement.getContext("2d");
	  
        var canvas_width = canvasElement.width;
        var canvas_height = canvasElement.height;
       
		
		
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

		
		
        
	
        var player = {
          color: "#00A",
          x: 110,
          y: 210,
          width: 100,
          height: 120,
          draw: function() {
            canvas.fillStyle = this.color;
            canvas.fillRect(this.x, this.y, this.width, this.height);
          }
        };

        var enemies = [];
		
		

        
        function Enemy(I) {
          I = I || {};
        
          I.active = true;
          I.age = Math.floor(Math.random() * 64);
          
          I.color = "#A2B";
        
          I.x = 800;
          I.y = 140;
          I.xVelocity = -1;
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
        
            I.yVelocity = 2 * Math.sin(I.age * Math.PI / 64);
        
            I.age++;
        
            I.active = I.active && I.inBounds();
          };
        
          I.explode = function() {
            Sound.play("explosion");
        
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
		
		    (function animloop(){
				requestAnimFrame(animloop);
				update();
				draw();
			})();
     
		
		
        function update() {
            
          enemies.forEach(function(enemy) {
            enemy.update();
          });
        
          enemies = enemies.filter(function(enemy) {
            return enemy.active;
          });
        
          handleCollisions();
        
          if(Math.random() < 0.005) {
            enemies.push(Enemy());
          }
        }
        
        
        player.midpoint = function() {
          return {
            x: this.x + this.width/2,
            y: this.y + this.height/2
          };
        };
        
        function draw() {
          canvas.clearRect(0, 0, canvas_width, canvas_height);
          player.draw();
          
        
        
          enemies.forEach(function(enemy) {
            enemy.draw();
          });
        }
        
        function collides(a, b) {
          return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
        }
        
        function handleCollisions() {   
        
          enemies.forEach(function(enemy) {
            if((collides(enemy, player)) && (detect==true) ){
              enemy.explode();
              player.explode();
            }
          });
        }
        
        player.explode = function() {
          this.active = false;
          // Extra Credit: Add an explosion graphic and then end the game
        };
        
        