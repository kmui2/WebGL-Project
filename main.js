var canvas, gl, m4, v3, p;
var forward, turn, lift, x, y, z;
var counter, time, pattern;

var Tcamera, Tprojection, Tmcp, buffers, coord, matrixStack, 
    Tmc, Tmodel, rotator, inColor, shaders;

function setup() {
  "use strict";

  // first we need to get the canvas and make an OpenGL context
	// in practice, you need to do error checking
  canvas = document.getElementById("mycanvas");
  gl =twgl.getWebGLContext(canvas);
  m4 = twgl.m4;
  v3 = twgl.v3;
  p = twgl.primitives;
    
  forward = 0;
  turn = 0;
  lift = 0;
  x = 0;
  y = 0;
  z = 10;

  counter = 0;
  time = 0.0;
  pattern = true;
    
    
  Tprojection = m4.perspective(Math.PI/3,1,1,400);
  matrixStack = [];
  Tmc = m4.identity();
  Tmodel = m4.identity();
  rotator = new SimpleRotator(canvas);
  rotator.setViewDistance(10);
  inColor = [1.0,0.0,0.0]
  
  initControls();



  // with twgl, the shaders get moved to the html file
  shaders = twgl.createProgramInfo(gl, ["vs", "fs"]);// let's define the vertex positions

    initPrimitives();

    initOrigTex();

  texture = checkersTex;


  /////////////////////////////
  //
  //    MAIN DRAW FUNCTION
  //
  ////////////////////////////

  function draw() {
	  // first, let's clear the screen
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(shaders.program);

    if (control.selectedIndex === 0)
      Tcamera = rotator.getViewMatrix();
    else
      Tcamera = drive();
    Tmodel = m4.identity();

    var translate = [0,0,0];
    var scale = [1,1,1];
    var xAngle = [0,0,0];
    var yAngle = [0,0,0];
    var zAngle = [0,0,0];
    inColor = [1.0,1.0,1.0];

    pushMatrix();
    mat4.scale(Tmodel,Tmodel,[0.05*sliderScaleX.value,0.05*sliderScaleY.value,0.05*sliderScaleZ.value]);
    mat4.translate(Tmodel,Tmodel,[sliderX.value*0.1,sliderY.value*0.1,sliderZ.value*0.1]);

    if(checkbox.checked) {
      pushMatrix();
      mat4.scale(Tmodel,Tmodel,[5,5,5]);
      if (view.selectedIndex === 0)
        drawPerson();
      else if (view.selectedIndex === 1){
        //rotateFromPiv([0,0,0],rad(counter*10),[0,1,0]);
        //mat4.translate(Tmodel,Tmodel,[5,0,0]);
        //rotate(rad(-90),[0,1,0])
        texture = steelTex;
        drawTrain();
      }
      else if (view.selectedIndex === 2){
        for (var i = -1; i<=1; i++) {
          for (var j = -1; j<=1; j++) {
            pushMatrix();
            texture = grassTex;
            inColor = [0.0,0.6,0.0];
            mat4.translate(Tmodel,Tmodel,[i*100,0,j*100]);
            drawGround();
            defaultTex();
            popMatrix();
          }
        }
      }
      else if (view.selectedIndex === 3){
        texture = bricksTex;
        drawHouse();
      }
      else if (view.selectedIndex === 4){
        texture = steelTex;
        drawHelicopter();
      }
      else if (view.selectedIndex === 5){
        texture = boulderTex;
        createBuffers('diamond');
      }
      else if (view.selectedIndex === 6){
        texture = boulderTex;
        createBuffers('octagon');
      }
      else if (view.selectedIndex === 7){
        mat4.scale(Tmodel,Tmodel,[0.1,0.1,0.1])
        drawSign();
      }
      else if (view.selectedIndex === 8){
        texture = steelTex;
        drawPlane();
      }
      popMatrix();
    }

    else {
//       pushMatrix();
//       mat4.scale(Tmodel,Tmodel,[5,5,5]);
//       texture = checkersTex;
//       drawHelicopter();
//       rotate(rad(90),[0,1,0]);
//       //drawOctagon();
//       texture = dogTex;
//       createBuffers('sphere');
//       popMatrix();

      //DRAW BACKGROUND
      pushMatrix();
      inColor = [1.5,1.5,1.5];
      texture = backgroundTex;
      var coord = [[0,0,-0.5],[0,-0.5,0],[-0.5,0,0],[0,0,0.5],[0,0.5,0],[0.5,0,0]];
      var x = [1,0,0];
      var y = [0,1,0];
      var z = [0,0,1];
        var textures = [
            centerTex,
            bottomTex,
            leftTex,
            farRightTex,
            topTex,
            rightTex
        ];
      var rotateAxis = [
          [x,z], //center
          [x,y], //bottom
          [z,x], //left
          [x,z], //farRight
          [x,y], //top
          [z,x] //right
      ];
      var rotate = [
          [rad(90),rad(0)], //center
           [rad(0),rad(0)], //bottom
           [rad(-90),rad(90)], //left
           [rad(-90),rad(180)], //farRight
           [rad(180),rad(0)], //top
           [rad(90),rad(90)] //right
      ];

      mat4.scale(Tmodel,Tmodel,[1000,1000,1000]);
      for (var i =0; i<6;i++) {
        pushMatrix();
          texture = textures[i];
        mat4.translate(Tmodel,Tmodel,coord[i]);
        mat4.rotate(Tmodel,Tmodel,rotate[i][1],rotateAxis[i][1]);
        mat4.rotate(Tmodel,Tmodel,rotate[i][0],rotateAxis[i][0]);
        createBuffers('plane', 1.0);
        popMatrix();
      }
      popMatrix();

      //DRAW WORLD
      pushMatrix();
      world();
      popMatrix();
    }
    popMatrix();

    //update
    if(pattern)
      counter+=0.1*slider2.value;
    forward = 0;
    window.requestAnimationFrame(draw);
  }



  


  


  function drive() {
    var eye = [x,y,z];
    var target = [Math.sin(turn*0.1)*Math.cos(lift*0.1)+x,
                  Math.sin(lift*0.1)+y,
                  -Math.cos(turn*0.1)*Math.cos(lift*0.1)+z];
    var up = [0,1,0];
    x += Math.sin(turn*0.1)*forward*0.2*Math.cos(lift*0.1);
    z += -Math.cos(turn*0.1)*forward*0.2*Math.cos(lift*0.1);
    y += Math.sin(lift*0.1)*forward*0.2;
    return m4.inverse(m4.lookAt(eye, target, up));
  }

  
  var lastDownTarget;
    document.addEventListener('mousedown', function(e) {
        lastDownTarget = event.target;
    }, false);

    document.addEventListener('keydown', function(e) {
        if(lastDownTarget == canvas) {

			//====================
			//	THE W KEY
			//====================
			if (e.keyCode == 87) {
                  forward+=1;
            }

			//====================
			//	THE S KEY
			//====================
			if (e.keyCode == 83) {
                  forward-=1;
            }

			//====================
			//	THE A KEY
			//====================
			if (e.keyCode == 65) {
                turn-=1;
            }

			//====================
			//	THE D KEY
			//====================
			if (e.keyCode == 68) {
                  turn+=1;
            }

			//====================
			//	THE SHIFT KEY
			//====================
			if (e.keyCode == 16) {
                  y+=0.1;
            }

			//====================
			//	THE CONTROL KEY
			//====================
			if (e.keyCode == 17) {
                  y-=0.1;
            }


			//====================
			//	THE UP KEY
			//====================
			if (e.keyCode == 38 && (control.selectedIndex === 2)) {
                  lift+=1;
            }

			//====================
			//	THE DOWN KEY
			//====================
			if (e.keyCode == 40 && (control.selectedIndex === 2)) {
                  lift-=1;
            }
			//====================
			//	THE RIGHT KEY
			//====================
			if (e.keyCode == 39 && (control.selectedIndex === 2)) {
                  turn+=1;
            }
			//====================
			//	THE LEFT KEY
			//====================
			if (e.keyCode == 37 && (control.selectedIndex === 2)) {
                  turn-=1;
            }
        }
    }, false);
reset.addEventListener('click', function(event) {

    slider2.value = -1;
    sliderX.value =0;
    sliderY.value=0;
    sliderZ.value=0;
    sliderScaleX.value=5;
    sliderScaleY.value=5;
    sliderScaleZ.value=5;
    rotator.setViewDistance(10);
    forward = 0;
    turn = 0;
    y=0;
    lift = 0;
}
                  );
togglePattern.addEventListener('click', function(event) {

    if (pattern)
      pattern = false;
      else
        pattern = true;}
                  );

/** This is high-level function.
 * It must react to delta being more/less than zero.
 */
function handle(delta) {
        if (delta < 0)
		rotator.setViewDistance(rotator.getViewDistance()+0.5);
        else
		rotator.setViewDistance(rotator.getViewDistance()-0.5);
}

/** Event handler for mouse wheel event.
 */
function wheel(event){
        var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
        } else if (event.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail/3;
        }
        /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
        if (delta)
                handle(delta);
        /** Prevent default actions caused by mouse wheel.
         * That might be ugly, but we handle scrolls somehow
         * anyway, so don't bother here..
         */
        if (event.preventDefault)
                event.preventDefault();
	event.returnValue = false;
}

/** Initialization code.
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener)
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false);
/** IE/Opera. */
window.onmousewheel = document.onmousewheel = wheel;
 /**
 *  A SimpleRotator can be used to implement rotation by mouse
 *  (or touch) WebGL.  In this style of rotation, the y-axis
 *  is always vertical, with the positive direction pointing
 *  upwards in the view.  Dragging the mouse left and right
 *  rotates the view about the y-axis.  Dragging it up and down
 *  rotates the view about the x-axis, with the angle of rotation
 *  about the x-axis limited to the range -85 to 85.
 *
 *  NOTE: No error checking of parameters is done!
 *
 * Functions defined for an object, rotator, of type SimpleRotator:
 *
 *    rotator.getViewMatrix() -- returns an array of 16 numbers representing
 *       the view matrix corresponding to the current rotation.  The
 *       matrix is in column-matrix order (ready for use with glMatrix or
 *       gl.uniformMatrix4fv).  The view matrix takes into account the
 *       view distance and the center of view.
 *    rotator.setXLimit( d ) -- sets the range of possible rotations
 *       about the x-axis.  The paramter must be a non-negative number,
 *       and the value is clamped to the range 0 to 85.  The allowed range
 *       of rotation angles is from -d to d degrees.  If the value is zero
 *       only rotation about the y-axis is allowed.  Initial value is 85.
 *    rotation.getXLimit() -- returns the current limit
 *    rotation.setRotationCenter( vector ) -- Sets the center of rotation.
 *       The parameter must be an array of (at least) three numbers.  The
 *       view is rotated about this point.  Usually, you want the rotation
 *       center to be the point that appears at the middle of the canvas,
 *       but that is not a requirement.  The initial value is effectively
 *       equal to [0,0,0].
 *    rotation.getRotationCenter() -- returns the current value.
 *    rotation.setAngles( rotateY, rotateX ) -- sets the angles of rotation
 *       about the y- and x- axes.  The values must be numbers and are
 *       given in degrees.  The limit on the range of x rotations is enforced.
 *       If the callback function is defined, it is called.
 *    rotation.setViewDistance(dist) -- Sets the view distance to dist, which
 *       must be a number.
 *    rotation.getViewDistance() -- returns the current value.
 *
 * @param canvas must be a DOM element for a canvas.  A mouse
 *     listener and a touch listener are installed on the canvas.
 *     This is a required parameter.
 * @param callback if present, must be a function.  The function,
 *     if given, is called when the view changes.  Typically, it
 *     it would be a function that renders the image in the canvas,
 *     or possibly a function that renders the image only if no
 *     animation is running.
 * @param viewDistance if present, must be a number.  Gives the
 *     distance of the viewer from the center of rotation, which
 *     is ordinarily the origin.  If not present, the distance is
 *     0, which can be appropriate for an orthogonal projection.
 * @param rotY if present, must be a number.  Gives the initial rotation
 *     about the y-axis, in degrees. If not present, the default is zero.
 * @param rotX if present, must be a number.  Gives the initial rotation
 *     about the x-axis, in degrees. If not present, the default is zero.
 */
function SimpleRotator(canvas, callback, viewDistance, rotY, rotX) {
    canvas.addEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("touchstart", doTouchStart, false);
    var rotateX = (rotX === undefined)? 0 : rotX;
    var rotateY = (rotY === undefined)? 0 : rotY;
    var xLimit = 85;
    var center;
    var degreesPerPixelX = 90/canvas.height;
    var degreesPerPixelY = 180/canvas.width;
    this.getXLimit = function() {
        return xLimit;
    }
    this.setXLimit = function(limitInDegrees) {
        xLimit = Math.min(85,Math.max(0,limitInDegrees));
    }
    this.getRotationCenter = function() {
        return (center === undefined) ? [0,0,0] : center;
    }
    this.setRotationCenter = function(rotationCenter) {
        center = rotationCenter;
    }
    this.setAngles = function( rotY, rotX ) {
        rotateX = Math.max(-xLimit, Math.min(xLimit,rotX));
        rotateY = rotY;
        if (callback) {
            callback();
        }
    }
    this.setViewDistance = function( dist ) {
        viewDistance = dist;
    }
    this.getViewDistance = function() {
        return (viewDistance === undefined)? 0 : viewDistance;
    }
    this.getViewMatrix = function() {
        var cosX = Math.cos(rotateX/180*Math.PI);
        var sinX = Math.sin(rotateX/180*Math.PI);
        var cosY = Math.cos(rotateY/180*Math.PI);
        var sinY = Math.sin(rotateY/180*Math.PI);
        var mat = [  // The product of rotation by rotationX about x-axis and by rotationY about y-axis.
            cosY, sinX*sinY, -cosX*sinY, 0,
            0, cosX, sinX, 0,
            sinY, -sinX*cosY, cosX*cosY, 0,
            0, 0, 0, 1
        ];
        if (center !== undefined) {  // multiply on left by translation by rotationCenter, on right by translation by -rotationCenter
            var t0 = center[0] - mat[0]*center[0] - mat[4]*center[1] - mat[8]*center[2];
            var t1 = center[1] - mat[1]*center[0] - mat[5]*center[1] - mat[9]*center[2];
            var t2 = center[2] - mat[2]*center[0] - mat[6]*center[1] - mat[10]*center[2];
            mat[12] = t0;
            mat[13] = t1;
            mat[14] = t2;
        }
        if (viewDistance !== undefined) {  // multipy on left by translation by (0,0,-viewDistance)
            mat[14] -= viewDistance;
        }
        return mat;
    }
    var prevX, prevY;  // previous position, while dragging
    var dragging = false;
    var touchStarted = false;
    function doMouseDown(evt) {
        if (dragging) {
            return;
        }
        dragging = true;
        document.addEventListener("mousemove", doMouseDrag, false);
        document.addEventListener("mouseup", doMouseUp, false);
        var r = canvas.getBoundingClientRect();
        prevX = evt.clientX - r.left;
        prevY = evt.clientY - r.top;
    }
    function doMouseDrag(evt) {
        if (!dragging) {
            return;
        }
        var r = canvas.getBoundingClientRect();
        var x = evt.clientX - r.left;
        var y = evt.clientY - r.top;
        var newRotX = rotateX + degreesPerPixelX * (y - prevY);
        var newRotY = rotateY + degreesPerPixelY * (x - prevX);
        newRotX = Math.max(-xLimit, Math.min(xLimit,newRotX));
        prevX = x;
        prevY = y;
        if (newRotX != rotateX || newRotY != rotateY) {
            rotateX = newRotX;
            rotateY = newRotY;
            if (callback) {
                callback();
            }
        }
    }
    function doMouseUp(evt) {
        if (!dragging) {
            return;
        }
        dragging = false;
        document.removeEventListener("mousemove", doMouseDrag, false);
        document.removeEventListener("mouseup", doMouseUp, false);
    }
    function doTouchStart(evt) {
        if (evt.touches.length != 1) {
           doTouchCancel();
           return;
        }
        evt.preventDefault();
        var r = canvas.getBoundingClientRect();
        prevX = evt.touches[0].clientX - r.left;
        prevY = evt.touches[0].clientY - r.top;
        canvas.addEventListener("touchmove", doTouchMove, false);
        canvas.addEventListener("touchend", doTouchEnd, false);
        canvas.addEventListener("touchcancel", doTouchCancel, false);
        touchStarted = true;
    }
    function doTouchMove(evt) {
        if (evt.touches.length != 1 || !touchStarted) {
           doTouchCancel();
           return;
        }
        evt.preventDefault();
        var r = canvas.getBoundingClientRect();
        var x = evt.touches[0].clientX - r.left;
        var y = evt.touches[0].clientY - r.top;
        var newRotX = rotateX + degreesPerPixelX * (y - prevY);
        var newRotY = rotateY + degreesPerPixelY * (x - prevX);
        newRotX = Math.max(-xLimit, Math.min(xLimit,newRotX));
        prevX = x;
        prevY = y;
        if (newRotX != rotateX || newRotY != rotateY) {
            rotateX = newRotX;
            rotateY = newRotY;
            if (callback) {
                callback();
            }
        }
    }
    function doTouchEnd(evt) {
        doTouchCancel();
    }
    function doTouchCancel() {
        if (touchStarted) {
           touchStarted = false;
           canvas.removeEventListener("touchmove", doTouchMove, false);
           canvas.removeEventListener("touchend", doTouchEnd, false);
           canvas.removeEventListener("touchcancel", doTouchCancel, false);
        }
    }
}

  draw();
}
window.onload = setup;
