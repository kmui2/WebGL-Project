
var slider2, sliderDay, sliderX, sliderY, sliderZ, sliderScaleX, sliderScaleY, sliderScaleZ;  

var control, view, togglePattern, reset, checkbox;

function initControls () {

  //Examine
  checkbox = document.getElementById('examine');
    control = document.getElementById('control');

      view = document.getElementById('view');

      //pattern is actually the pause/play button
      togglePattern = document.getElementById('pattern');
      reset = document.getElementById('reset');


      //Examine
      checkbox = document.getElementById('examine');



      //Rotate
      slider2 = document.getElementById('slider2');
      slider2.value = -1;

      //Rotate
      sliderDay = document.getElementById('day');
      sliderDay.value = 0;

      //**Translating**//                
      //X
      sliderX = document.getElementById('sliderX');
      sliderX.value = 0;

      //Y
      sliderY = document.getElementById('sliderY');
      sliderY.value = 0;

      //Z
      sliderZ = document.getElementById('sliderZ');
      sliderZ.value = 0;

      //**Scaling**//                
      //X
      sliderScaleX = document.getElementById('sliderScaleX');
      sliderScaleX.value = 5;

      //Y
      sliderScaleY = document.getElementById('sliderScaleY');
      sliderScaleY.value = 5;

      //Z
      sliderScaleZ = document.getElementById('sliderScaleZ');
      sliderScaleZ.value = 5;
}