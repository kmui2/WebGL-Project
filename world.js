////////////////////
  //   WORLD
  ///////////////////

  function world() {
    pushMatrix();

    //PLANE
    pushMatrix();
    inColor = [1.0,1.0,1.0];
    texture = steelTex;
    translate([0,50,-100]);
    var count = (-counter*0.1)%2;
    //console.log(count);
    var up = [0,1,0]
    var t;
    var p0;
    var d0;
    var p1;
    var d1;
    if(count<1) {
     t = count;
     p0=[0,0,0];
     d0=[500,0,0];
     p1=[0,0,200];
     d1=[200,-200,0];
    }
    else {
     t = count-1;
     p1=[0,0,0];
     d1=[500,0,0];
     p0=[0,0,200];
     d0=[200,-200,0];
    }

    var P = [p0,d0,p1,d1]; // All the control points
      

    var Tmodel_trans=m4.translation(Cubic(Hermite,P,t));
    var Tmodel_rot=m4.lookAt([0,0,0],Cubic(HermiteDerivative,P,t),up);
    var temp=m4.multiply(Tmodel_rot,Tmodel_trans);
    mat4.mul(Tmodel,Tmodel,temp)
    rotate(rad(90),[0,1,0]);
    drawPlane();
    popMatrix();

    //person
    pushMatrix();
    rotateFromPiv([0,0,0],rad(counter*10),[0,1,0]);
    translate([10,2,0]);
    drawPerson();
    popMatrix();

    //ground
    for (var i = -1; i<=1; i++) {
      for (var j = -1; j<=1; j++) {
        pushMatrix();
        texture = grassTex;
        inColor = [0.0,0.6,0.0];
        translate([i*100,0,j*100]);
        drawGround();
        defaultTex();
        popMatrix();
      }
    }
    inColor = [1.0,1.0,1.0];

    //house
    pushMatrix();
    translate([0,5,0])
    scale([3,3,3]);
    texture = bricksTex;
    drawHouse();
    defaultTex();
    popMatrix();

    //apartment
    pushMatrix();
    translate([20,15,30])
    scale([5,10,5]);
    texture = apartmentTex;
    drawHouse();
    popMatrix();

    //TRAIN
    pushMatrix();
    rotateFromPiv([1,1,1],rad(counter*10),[0,1,0]);
    translate([20,7,0]);
    rotate(rad(-90),[0,1,0])
    scale([5,5,5]);
    drawTrain();
    defaultTex();
    popMatrix();

    //HELICOPTER
    pushMatrix();
    translate([0,0,-50]);
    rotateFromPiv([0,5,0],rad(counter*50),[0,1,0]);
    translate([10+ 10*Math.sin(counter*0.1), 10*Math.sin(counter*0.1)+10,0]);
    rotate(rad(-90),[0,1,0])
    scale([2,2,2]);
    drawHelicopter();
    popMatrix();

    //DIAMOND
    pushMatrix();
    translate([-20,20,20]);
    rotate(counter,[0,1,0]);
    scale([4,4,4]);
    texture = mirrorTex;
    createBuffers('diamond');
    popMatrix();

    //OCTAGON
    pushMatrix();
    translate([20,5,-20]);
    scale([2,2,2]);
    texture = boulderTex;
    createBuffers('octagon');
    popMatrix();

    //SIGNPOST
    pushMatrix();
    translate([30,0,-30]);
    drawSign();
    popMatrix();

    popMatrix();
  }


      ///////////////////////
  // PLANE
  ///////////////////////

  function drawPlane() {
    pushMatrix();
    scale([15,5,5]);
    rotate(rad(90),[0,0,1]);
    createBuffers('cylinder');
    popMatrix();

    pushMatrix();
    translate([10,0,0]);
    scale([5,5,5]);
    rotate(rad(-90),[0,0,1]);
    createBuffers('truncatedCone');
    popMatrix();

    pushMatrix();
    rotateFromPiv([12,5,0,0],rad(counter*100),[1,0,0]);
    scale([0.5,5,1.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    rotateFromPiv([12,5,0,0],rad(counter*100+120),[1,0,0]);
    scale([0.5,5,1.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    rotateFromPiv([12,5,0,0],rad(counter*100+240),[1,0,0]);
    scale([0.5,5,1.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,2,0]);
    scale([5,5,2.5]);
    createBuffers('sphere');
    popMatrix();

    pushMatrix();
    translate([-10,0,0]);
    scale([5,5,5]);
    rotate(rad(90),[0,0,1]);
    createBuffers('truncatedCone');
    popMatrix();

    pushMatrix();
    translate([-10,0,0]);
    scale([3,1,20]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([-12,5,0]);
    rotate(rad(45),[0,0,1]);
    scale([3,10,1]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,0,7]);
    rotate(rad(-45),[0,1,0]);
    scale([5,1.5,10]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,0,-7]);
    rotate(rad(45),[0,1,0]);
    scale([5,1.5,10]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,-4,0]);
    rotate(rad(45),[1,0,0]);
    scale([0.5,6,0.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,-7,2]);
    scale([1,1,2]);
    rotate(rad(90),[1,0,0]);
    createBuffers('cylinder');
    popMatrix();

    pushMatrix();
    translate([0,-4,0]);
    rotate(rad(-45),[1,0,0]);
    scale([0.5,6,0.5]);
    createBuffers('cube');
    popMatrix();

    pushMatrix();
    translate([0,-7,-2]);
    scale([1,1,2]);
    rotate(rad(90),[1,0,0]);
    createBuffers('cylinder');
    popMatrix();

  }
  ///////////////////////
  //   SIGN
  //////////////////////

  function drawSign() {
    pushMatrix();
    texture = steelTex;
    scale([0.5,10,0.5]);
    translate([0,1,0]);
    createBuffers('cylinder');
    popMatrix();

    pushMatrix();
    texture = snakeTex;
    scale([20,10,0.25]);
    translate([0,2,0]);
    createBuffers('cube')
    popMatrix();
  }
  /////////////////////////////
  //   HELECOPTER
  //////////////////////////

  function drawHelicopter() {

    texture = steelTex;

    //cockpit
    inColor = [0.7,0.7,0.7];
    pushMatrix();
    translate([1,0,0]);
    scale([1,1,1]);
    createBuffers('sphere');
    popMatrix();

    //blades
    inColor = [0.0,0.0,0.0];
    var rotateInit = [0,rad(90)];
    for (var i = 0; i<rotateInit.length; i++) {
      pushMatrix();
      translate([0,1.25,0]);
      rotate(counter+rotateInit[i],[0,1,0]);
      scale([0.25,0.25,5])
      rotate(rad(90),[1,0,0]);
      createBuffers('cylinder');
      popMatrix();
    }

    //rails
    inColor = [0.0,1.0,0.0];
    coord = [[0,-1.5,1],[0,-1.5,-1]];
    for (var i = 0; i<coord.length;i++) {
      pushMatrix();
      translate(coord[i])
      scale([3,0.25,0.25]);
      rotate(rad(90),[0,0,1]);
      createBuffers('cylinder');
      popMatrix();
    }

    coord = [[0.5,-1,0.5],[-0.75,-1,0.5],[0.5,-1,-0.5],[-0.75,-1,-0.5]];
    var rotations = [-45,-45,45,45];
    for (var i = 0; i<coord.length;i++){
      pushMatrix();
      translate(coord[i]);
      rotate(rad(rotations[i]),[1,0,0]);
      scale([0.25,1.5,0.25])
      createBuffers('cylinder');
      popMatrix();
    }

    //axle
    inColor = [0.7,0.7,0.7];
    pushMatrix();
    translate([0,1,0]);
    scale([0.25,1,0.25]);
    createBuffers('cylinder');
    popMatrix();

    //body
    inColor = [1.0,0.0,0.0];
    pushMatrix();
    scale([3,1,0.5]);
    createBuffers('cube');
    popMatrix();

    inColor = [0.0,0.0,1.0];
    pushMatrix();
    translate([-1.75,0.3,0]);
    rotate(rad(-45),[0,0,1]);
    scale([1.5,0.75,0.5]);
    createBuffers('cube');
    popMatrix();

    inColor = [1.0,1.0,1.0];
  }

  //////////////////////
  //     HOUSE
  //////////////////////

  function drawHouse() {
    pushMatrix();

    //walls
    coord = [-1.4,1.4];
    for (var i = 0; i<2; i++) {
      pushMatrix();
      translate([coord[i],0,0]);
      scale([0.3,3,3]);
      createBuffers('cube');
      popMatrix();
    }

    for (var i = 0; i<2; i++) {
      pushMatrix();
      translate([0,0,coord[i]]);
      scale([3,3,0.3])
      createBuffers('cube');
      popMatrix();
    }

    texture = roofTex;
    //roof
    pushMatrix();
    translate([0,2.5,0]);
    scale([3,2,3]);
    createBuffers('pyramid');
    popMatrix();

    //chimney
    pushMatrix();
    translate([1,2.5,0]);
    scale([0.5,2,0.5]);
    createBuffers('cube');
    popMatrix();

    defaultTex();

    inColor=[0.5,0.5,0.5];
    //smoke
    for(i=0;i<5;i++) {
      pushMatrix();
      translate([1,2.5+(-(counter+i)*0.5)%5,0]);
      scale([0.2,0.2,0.2]);
      createBuffers('sphere');
      popMatrix();
    }
    inColor = [1.0,1.0,1.0];

    popMatrix();
  }


  /////////////////////////
  //        GROUND
  ///////////////////////

  function drawGround() {
    pushMatrix();

    pushMatrix();
    translate([0,0,0]);
    scale([100,100,100]);
    createBuffers('plane');
    popMatrix();

    popMatrix();
  }



  ///////////////////////
  //     PERSON
  ///////////////////////

  function drawPerson(speed) {
    pushMatrix();

    //head
    texture = snakeTex;
    pushMatrix();
      translate([0,1.25,0]);
      scale([0.8,0.8,0.8]);
      rotate(rad(130),[0,1,0]);
      createBuffers("sphere");
    popMatrix();

    //body
    texture = bodyTex;
    pushMatrix();
      translate([0,0,0]);
      scale([1,1.75,0.5]);
      rotate(rad(0),[0,0,0]);
      createBuffers("cube");
    popMatrix();

    //arms
    texture = checkersTex;
    inColor = [1.0,0.0,0.0];
    coord = [0.75,-0.75];
    var armRot = [rad(-70*Math.sin(counter*0.5)), rad(70*Math.sin(counter*0.5))]
    for (var i = 0; i<coord.length; i++) {
      pushMatrix();
        mat4.translate(Tmodel,Tmodel,[coord[i],0.75,0]);
        rotateFromPiv([0,-0.75,0], -armRot[i],[1,0,0]);
        mat4.scale(Tmodel,Tmodel,[0.5,1.75,0.5]);
        createBuffers("cube")
      popMatrix();
    }

    //legs
    coord = [0.25,-0.25];
    var legRot = [rad(70*Math.sin(counter*0.5)), rad(-70*Math.sin(counter*0.5))]
    for (var i = 0; i<coord.length; i++) {
      pushMatrix();
        mat4.translate(Tmodel,Tmodel,[coord[i],-0.75,0]);
        rotateFromPiv([0,-0.75,0], legRot[i],[1,0,0]);
        mat4.scale(Tmodel,Tmodel,[0.5,1.5,0.5]);
        createBuffers("cube")
      popMatrix();
    }

    inColor = [1.0,1.0,1.0];
    popMatrix();
  }


  ///////////////////////////////
  //      TRAIN
  ////////////////////////////

  function drawTrain() {
    pushMatrix();
    texture = steelTex;

    //front
    inColor = [1.0,1.0,0.0];
    pushMatrix();
      scale([2,0.5,0.5])
      rotate(rad(90),[0,0,1]);
      createBuffers("cylinder");
    popMatrix();

    //body
    pushMatrix();
      translate([1,0,0])
      scale([0.5,0.5,0.5]);
      rotate(rad(-90),[0,0,1])
      createBuffers("truncatedCone");
    popMatrix();

    //exhaust
    pushMatrix();
      translate([0.5,0.65,0])
      scale([0.25,1,0.25]);
      rotate(rad(180),[1,0,0]);
      inColor = [0.0,1.0,1.0];
      createBuffers("truncatedCone");
    popMatrix();

    //SMOKE
    inColor=[0.5,0.5,0.5];
    for(i=0;i<5;i++) {
      pushMatrix();
      translate([0.5,1+(-(counter+i)*0.5)%5,0]);
      scale([0.2,0.2,0.2]);
      rotate(rad(180),[1,0,0]);
      createBuffers('sphere');
      popMatrix();
    }

    //cockpit
    inColor = [0.0,0.0,1.0];
    pushMatrix();
      translate([-1,0,0]);
      scale([1,1,1]);
      rotate(rad(0),[0,0,0]);
      createBuffers("cube");
    popMatrix();

    inColor = [0.0,1.0,1.0];
    coord = [[-1.375,0.375],[-1.375,-0.375],[-0.625,0.375],[-0.625,-0.375]];
    for (var i=0;i<coord.length;i++) {
      pushMatrix();
        translate([coord[i][0],0.85,coord[i][1]]);
        scale([0.25,0.75,0.25]);
        rotate(rad(0),[0,0,0]);
        createBuffers("cube");
      popMatrix();
    }

    pushMatrix();
      translate([-1,1.125,0]);
      scale([1,0.25,1]);
      rotate(rad(0),[0,0,0]);
      createBuffers("cube");
    popMatrix();

     pushMatrix();
      translate([-1,1.5,0]);
      scale([1,0.5,1]);
      rotate(rad(0),[0,0,0]);
      inColor = [1.0,0.0,0.0];
      createBuffers("pyramid");
    popMatrix();

    //wheels
    inColor = [0.0,1.0,0.0];
    coord = [[-0.75,0.6],[0.5,0.6],[-0.75,-0.6],[0.5,-0.6]];
    for (i=0;i<coord.length;i++) {
      pushMatrix();
        translate([coord[i][0],-0.5,coord[i][1]]);
        scale([0.5,0.5,0.1]);
        rotate(rad(90),[1,0,0]);
        rotate(rad(counter*30),[0,1,0]);
        createBuffers("cylinder");
      popMatrix();
    }

    inColor=[1.0,1.0,1.0];
    popMatrix();
  }

function createBuffers(block, sky) {
    switch (block) {
      case "truncatedCone":
        buffers = truncatedConeBuffer;
        break;
      case "torus":
        buffers = torusBuffer;
        break;
      case "plane":
        buffers = planeBuffer;
        break;
      case "cresent":
        buffers = cresentBuffer;
        break;
      case "disc":
        buffers = discBuffer;
        break;
      case "sphere":
        buffers = sphereBuffer;
        break;
      case "skyBox":
        buffers = skyBoxBuffer;
        break;
      case "cube":
        buffers = cubeBuffer;
        break;
      case "cylinder":
        buffers = cylinderBuffer;
        break;
      case "pyramid":
        buffers = pyramidBuffer;
        break;
      case "octagon":
        buffers = octagonBuffer;
        break;
      case "diamond":
        buffers = diamondBuffer;
        break;
    }


    var skyBox = sky || 0.0;
    Tmc = m4.multiply(Tmodel,Tcamera);
    Tmcp = m4.multiply(Tmc,Tprojection);
    twgl.setUniforms(shaders,{transf : Tmcp,
                               normalMatrix:m4.transpose(m4.inverse(Tmodel)),
                                 time:counter*10,
                                   patttern:pattern,
                                         inColor:inColor,
                                             day:sliderDay.value,
                                               tex: texture,
                                                skyBox: skyBox,});
    twgl.setBuffersAndAttributes(gl,shaders,buffers);
    twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
  }
