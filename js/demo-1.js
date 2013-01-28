   	function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
      }

      window.onload = function(images) {
        var sources = {
          gold: "img/gold.png",
          green: "img/green.png",
		  lime: "img/lime.png",
		  orange: "img/orange.png",
		  pink: "img/pink.png",
		  purple: "img/purple.png",
		  red: "img/red.png",
		  turquoise: "img/turquoise.png"
        };
        loadImages(sources, function(images) {
			var    b2Vec2 = Box2D.Common.Math.b2Vec2
				,      b2BodyDef = Box2D.Dynamics.b2BodyDef
				,      b2Body = Box2D.Dynamics.b2Body
				,      b2FixtureDef = Box2D.Dynamics.b2FixtureDef
				,      b2World = Box2D.Dynamics.b2World
				,      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
				,      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
				,      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
				,      b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
				,      b2DebugDraw = Box2D.Dynamics.b2DebugDraw
				,      b2Fixture = Box2D.Dynamics.b2Fixture
				,      b2AABB = Box2D.Collision.b2AABB;
				
				var world = new b2World(new b2Vec2(0,10), true);
			
				for(i=0;i<8;i++)	{
					
					var colour = [images.gold,images.green,images.lime,images.orange,images.pink,images.purple,images.red,images.turquoise];
					var src = colour[i];
					
					var X = Math.round(Math.random()*25);
					var Y = Math.round(Math.random()*9);
					var bodyDef2 = new b2BodyDef;
					bodyDef2.type = b2Body.b2_dynamicBody;
					bodyDef2.position.Set(X,Y);
					bodyDef2.userData = src;
					
					var fixDef2 = new b2FixtureDef;
					fixDef2.density = 10.0;
					fixDef2.friction = .9;
					fixDef2.restitution = .2; 
					fixDef2.shape = new b2PolygonShape;
					fixDef2.shape.SetAsBox((40/60),(40/60)); 
					
					world.CreateBody(bodyDef2).CreateFixture(fixDef2);
				}
				
				
				// Ground
				var bodyDef = new b2BodyDef;
				bodyDef.type = b2Body.b2_staticBody;
				bodyDef.position.Set(10,16);
				bodyDef.userData = 'ground';
				
				var fd = new b2FixtureDef;
				fd.shape = new b2PolygonShape;
				fd.shape.SetAsBox(20,0.5);
				  
				var holder = world.CreateBody(bodyDef);
				holder.CreateFixture(fd);
		
		
			
				
				function update() {
					world.Step(1 / 60, 10, 10);
					if(isMouseDown && (!mouseJoint)) {
						var body = getBodyAtMouse();
						if(body) {
							var md = new b2MouseJointDef();
							md.bodyA = world.GetGroundBody();
							md.bodyB = body;
							md.target.Set(mouseX, mouseY);
							md.collideConnected = true;
							md.maxForce = 300.0 * body.GetMass();
							mouseJoint = world.CreateJoint(md);
							body.SetAwake(true);
						}
					}
					if(mouseJoint) {
						if(isMouseDown) {
							mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
						} 
						else {
							world.DestroyJoint(mouseJoint);
							mouseJoint = null;
						}
					}
					
					$("canvas").clearCanvas();
					for (b = world.GetBodyList() ; b; b = b.GetNext())
					{
						var angle = b.GetAngle()*(180/Math.PI);
						var pos = b.GetPosition();		
						  if (b.GetUserData() != 'ground'){	
							  $("canvas")
							  .rotateCanvas({
								  x: pos.x * 30, y: pos.y * 30,
								  rotate: angle
							  })
							  .drawImage({
								  source: b.GetUserData(),
								  x: pos.x * 30, y: pos.y * 30,
								  fromCenter: true
							  })
							  .restoreCanvas();
						   }
						   else if(b.GetUserData() == 'ground')	{
							   $("canvas").drawRect({
								
							  })
						   }
						
					}
					//world.DrawDebugData();
					world.ClearForces();			
				};
				
				var canvasPosition = {};
				canvasPosition.x = $('canvas').offset().left;
				canvasPosition.y = $('canvas').offset().top;	
				//mouse
				 
				var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
				 
				document.addEventListener("mousedown", function(e) {
				   isMouseDown = true;
				   handleMouseMove(e);
				   document.addEventListener("mousemove", handleMouseMove, true);
				}, true);
				 
				document.addEventListener("mouseup", function() {
				   document.removeEventListener("mousemove", handleMouseMove, true);
				   isMouseDown = false;
				   mouseX = undefined;
				   mouseY = undefined;
				}, true);
				 
				function handleMouseMove(e) {
				   mouseX = (e.clientX - canvasPosition.x) / 30;
				   mouseY = (e.clientY - canvasPosition.y) / 30;
				};
				 
				function getBodyAtMouse() {
				   mousePVec = new b2Vec2(mouseX, mouseY);
				   var aabb = new b2AABB();
				   aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
				   aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
				 
				   // Query the world for overlapping shapes.
				 
				   selectedBody = null;
				   world.QueryAABB(getBodyCB, aabb);
				   return selectedBody;
				}
				 
				function getBodyCB(fixture) {
					console.log(fixture);
				   if(fixture.GetBody().GetType() != 0) { //Static Bodies have type 0
					  if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
						 selectedBody = fixture.GetBody();
						 return false;
					  }
				   }
				   return true;
				}
				
				
				// requestAnim shim layer by Paul Irish
				window.requestAnimFrame =(function(){
				  return  window.requestAnimationFrame       || 
						  window.webkitRequestAnimationFrame || 
						  window.mozRequestAnimationFrame    || 
						  window.oRequestAnimationFrame      || 
						  window.msRequestAnimationFrame     || 
						  function(/* function */ callback, /* DOMElement */ element){
							window.setTimeout(callback, 1000 / 60);
						  };
				})();
				
				function animate() {
					requestAnimFrame(animate);
					update();	
				}
				
				animate();
				
			});
      };