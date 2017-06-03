

function setup() {
    "use strict";

    // first we need to get the canvas and make an OpenGL context
    // in practice, you need to do error checking
    canvas = document.getElementById("mycanvas");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    gl = twgl.getWebGLContext(canvas);
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
    play = true;


    Tprojection = m4.perspective(Math.PI / 3, 1, 1, 400);
    matrixStack = [];
    Tmc = m4.identity();
    Tmodel = m4.identity();
    rotator = new SimpleRotator(canvas);
    rotator.setViewDistance(10);
    inColor = [1.0, 0.0, 0.0]

    initControls();



    // with twgl, the shaders get moved to the html file
    shaders = twgl.createProgramInfo(gl, ["vs", "fs"]); // let's define the vertex positions

    initPrimitives();

    initOrigTex();

    texture = checkersTex;




    /** Initialization code.
     * If you use your own event management code, change it as required.
     */
    if (window.addEventListener)
    /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false);
    /** IE/Opera. */
    window.onmousewheel = document.onmousewheel = wheel;
    events();
    draw();
}