
  function pushMatrix() {
    matrixStack.push(m4.copy(Tmodel));
  }

  function popMatrix() {
    Tmodel = matrixStack.pop(Tmodel);
  }
  function scale(scale) {
    mat4.scale(Tmodel,Tmodel,scale);
  }

  function translate(translate) {
    mat4.translate(Tmodel,Tmodel,translate);
  }

  function rotate(rotate,axis) {
    mat4.rotate(Tmodel,Tmodel,rotate,axis);
  }

  function rotateFromPiv(piv, rotate, axis, z) {
    mat4.rotate(Tmodel,Tmodel,rotate,axis);
    var temp = mat4.create();
    mat4.translate(temp,temp,piv);
    mat4.multiply(Tmodel,Tmodel,temp);
  }
  function rad(degrees) {
    return (degrees)/180*Math.PI;
  }
