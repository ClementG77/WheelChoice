document.getElementById("myText").addEventListener('input', function() {
  getChoice()
});

document.getElementById("spin_button").addEventListener('click', function() {
  startDraw()
});

let wheelSpinning = false;
let replay = 0 ;
let result={};
let choice;
let bestChoose = 0;
function getChoice() {
  var x = document.getElementById("myText").value;
  choice = x.split(',');
}


let theWheel = new Winwheel({
       // Specify number of segments.
  'outerRadius': 212,   // Set outer radius so wheel fits inside the background.
  'textFontSize': 28,    // Set font size as desired.
  'segments':        // Define segments including colour and text.
    [
    ],
  'animation':           // Specify the animation to use.
  {
    'type': 'spinToStop',
    'duration': 3,     // Duration in seconds.
    'spins': 3,     // Number of complete spins.
    'callbackFinished': alertPrize
  }
});

function initialize(){
  let colors = ["green","blue","purple","yellow","red","grey","cyan"]
  if (choice != undefined) {
    for (let index = 0; index < choice.length ; index++) {
      const element = choice[index];
      theWheel.addSegment({
        'text' : element,
        'fillStyle' : colors[index]
    }, 1);
    }
    theWheel.deleteSegment()
    if (replay > 0 ) {
      theWheel.deleteSegment();
    }
    
    choice.forEach((el, index) => result[el] = 0);
    theWheel.numSegments = choice.length;
    theWheel.draw();
  }
  else{
    alert('Please enter your choice ')
  }
}


 function startDraw() {
  initialize();
  if (bestChoose != 0 && choice != undefined) {
    document.getElementById("bo3").disabled = true;
    document.getElementById("bo5").disabled = true;
    document.getElementById("bo7").disabled = true;
    if (wheelSpinning === false) {
      theWheel.rotationAngle = 0;
      theWheel.draw();
      startSpin(); 
    }
  }
  else{
    alert("Please Choose how many rounds you want to play")
  }
  
}

 function startSpin() {
  if (wheelSpinning == false) {
    theWheel.rotationAngle = 0;
    theWheel.draw();
    document.getElementById('spin_button').src = "image/spin_off.png";
    document.getElementById('spin_button').className = "";

    theWheel.startAnimation();

    wheelSpinning = true;
  }
}
function alertWinner(){
  let winner = "";
  for(var key in result) {
    var value = result[key];
    if (value == bestChoose) {
      winner = key;
    }
  }
  alert("Winner of the draw is " + winner)
  replay +=1;
  resetResult();
}

function resetResult() {
  choice = [];
  for(var key in result) {
    result[key] = 0;
    }
    document.getElementById("myText").value = "";
    document.getElementById("bo3").disabled = false;
    document.getElementById("bo5").disabled = false;
    document.getElementById("bo7").disabled = false;
    location.reload();
}

function alertPrize(indicatedSegment) {
  let fin = new String(indicatedSegment.text)
  let choice = false;
  result[fin] += 1;
  wheelSpinning = false;
  for(var key in result) {
    var value = result[key];
    if (value >= bestChoose) {
      choice = true;
      alertWinner();
    }
  }
  if (choice == false) {
    startSpin();
  } 
}

$("input:checkbox").on('click', function() {
  var $box = $(this);
  if ($box.is(":checked")) {
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    bestChoose = $box.prop("checked", true)[0].value;
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});