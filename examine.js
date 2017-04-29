function examine () {
    
        pushMatrix();
        mat4.scale(Tmodel, Tmodel, [5, 5, 5]);
        if (view.selectedIndex === 0)
            drawPerson();
        else if (view.selectedIndex === 1) {
            //rotateFromPiv([0,0,0],rad(counter*10),[0,1,0]);
            //mat4.translate(Tmodel,Tmodel,[5,0,0]);
            //rotate(rad(-90),[0,1,0])
            texture = steelTex;
            drawTrain();
        } else if (view.selectedIndex === 2) {
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    pushMatrix();
                    texture = grassTex;
                    inColor = [0.0, 0.6, 0.0];
                    mat4.translate(Tmodel, Tmodel, [i * 100, 0, j * 100]);
                    drawGround();
                    defaultTex();
                    popMatrix();
                }
            }
        } else if (view.selectedIndex === 3) {
            texture = bricksTex;
            drawHouse();
        } else if (view.selectedIndex === 4) {
            texture = steelTex;
            drawHelicopter();
        } else if (view.selectedIndex === 5) {
            texture = boulderTex;
            createBuffers('diamond');
        } else if (view.selectedIndex === 6) {
            texture = boulderTex;
            createBuffers('octagon');
        } else if (view.selectedIndex === 7) {
            mat4.scale(Tmodel, Tmodel, [0.1, 0.1, 0.1])
            drawSign();
        } else if (view.selectedIndex === 8) {
            texture = steelTex;
            drawPlane();
        }
        popMatrix();
}