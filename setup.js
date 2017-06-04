

function setup() {    
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;
    
    //camera options
    forward = 0;
    turn = 0;
    lift = 0;
    x = 0;
    y = 0;
    z = 10;

    //variables
    counter = 0;
    time = 0.0;
    play = true;
    
    //Matricies
    Tprojection = m4.perspective(Math.PI / 3, 1, 1, 400);
    matrixStack = [];
    Tmc = m4.identity();
    Tmodel = m4.identity();
    
    rotator = new SimpleRotator(canvas);
    rotator.setViewDistance(10);
    inColor = [1.0, 0.0, 0.0]

    //add controls on html
    initControls();

    //WebGL options
    shaders = twgl.createProgramInfo(gl, ["vs", "fs"]); 
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(shaders.program);

    //add primitives
    initPrimitives();

    //add default textures
    initOrigTex();

//    texture = checkersTex;

    //add mousewheel event listener
    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', wheel, false);
    window.onmousewheel = document.onmousewheel = wheel;
    
    events();
    draw();
}
