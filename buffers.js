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
                                 patttern:play,
                                       inColor:inColor,
                                           day:sliderDay.value,
                                             tex: texture,
                                              skyBox: skyBox,});
  twgl.setBuffersAndAttributes(gl,shaders,buffers);
  twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
}
