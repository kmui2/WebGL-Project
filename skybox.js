function skybox() {
    
        //DRAW BACKGROUND
        pushMatrix();
        inColor = [1.5, 1.5, 1.5];
        texture = backgroundTex;
        var coord = [[0, 0, -0.5], [0, -0.5, 0], [-0.5, 0, 0], [0, 0, 0.5], [0, 0.5, 0], [0.5, 0, 0]];
        var x = [1, 0, 0];
        var y = [0, 1, 0];
        var z = [0, 0, 1];
        var skyboxTextures = [
            centerTex,
            bottomTex,
            leftTex,
            farRightTex,
            topTex,
            rightTex
        ];
        var rotateAxis = [
          [x, z], //center
          [x, y], //bottom
          [z, x], //left
          [x, z], //farRight
          [x, y], //top
          [z, x] //right
      ];
        var rotations = [
          [rad(90), rad(0)], //center
           [rad(0), rad(0)], //bottom
           [rad(-90), rad(90)], //left
           [rad(-90), rad(180)], //farRight
           [rad(180), rad(0)], //top
           [rad(90), rad(90)] //right
      ];

        mat4.scale(Tmodel, Tmodel, [1000, 1000, 1000]);
        for (var i = 0; i < 6; i++) {
            pushMatrix();
            texture = skyboxTextures[i];
            mat4.translate(Tmodel, Tmodel, coord[i]);
            mat4.rotate(Tmodel, Tmodel, rotations[i][1], rotateAxis[i][1]);
            mat4.rotate(Tmodel, Tmodel, rotations[i][0], rotateAxis[i][0]);
            createBuffers('plane', 1.0);
            popMatrix();
        }
        popMatrix();
}