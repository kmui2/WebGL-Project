var canvas, gl, m4, v3, p;
var forward, turn, lift, x, y, z;
var counter, time, play;

var Tcamera, Tprojection, Tmcp, buffers, coord, matrixStack,
    Tmc, Tmodel, rotator, inColor, shaders, texture;

/////////////////////////////
//
//    MAIN DRAW FUNCTION
//
////////////////////////////

function draw() {
    doWebGL();
    if (control.selectedIndex === 0)
        Tcamera = rotator.getViewMatrix();
    else
        Tcamera = drive();
    Tmodel = m4.identity();

    var translate = [0, 0, 0];
    var scale = [1, 1, 1];
    var xAngle = [0, 0, 0];
    var yAngle = [0, 0, 0];
    var zAngle = [0, 0, 0];
    inColor = [1.0, 1.0, 1.0];

    pushMatrix();
    mat4.scale(Tmodel, Tmodel, [0.05 * sliderScaleX.value, 0.05 * sliderScaleY.value, 0.05 * sliderScaleZ.value]);
    mat4.translate(Tmodel, Tmodel, [sliderX.value * 0.1, sliderY.value * 0.1, sliderZ.value * 0.1]);

    // For EXAMINE
    if (checkbox.checked) {
        examine();
    }


    //NOT EXAMINE
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
        skybox();

        //DRAW WORLD
        pushMatrix();
        world();
        popMatrix();
    }
    popMatrix();

    //update
    if (play)
        counter += 0.1 * slider2.value;
//    forward = 0;
    window.requestAnimationFrame(draw);
}



window.onload = setup;