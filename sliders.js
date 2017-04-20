  var control = document.getElementById('control');
  
  var view = document.getElementById('view');
  
  //pattern is actually the pause/play button
  var togglePattern = document.getElementById('pattern');
  var reset = document.getElementById('reset');
  
  
  //Examine
  var checkbox = document.getElementById('examine');
                  


  //Rotate
  var slider2 = document.getElementById('slider2');
  slider2.value = -1;
  
  //Rotate
  var sliderDay = document.getElementById('day');
  sliderDay.value = 0;
  
  //**Translating**//                
  //X
  var sliderX = document.getElementById('sliderX');
  sliderX.value = 0;
                  
  //Y
  var sliderY = document.getElementById('sliderY');
  sliderY.value = 0;
                  
  //Z
  var sliderZ = document.getElementById('sliderZ');
  sliderZ.value = 0;
                  
  //**Scaling**//                
  //X
  var sliderScaleX = document.getElementById('sliderScaleX');
  sliderScaleX.value = 5;
                  
  //Y
  var sliderScaleY = document.getElementById('sliderScaleY');
  sliderScaleY.value = 5;
                  
  //Z
  var sliderScaleZ = document.getElementById('sliderScaleZ');
  sliderScaleZ.value = 5;