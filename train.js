var im_car_green;
var im_car_red;
var im_boom;
var im_heart;
var font;
let video;
let flipVideo;
var playerSpeed = 7;
var opponents = [];
var roadMarkings = [];
var score = 0;
var lives = 5;
let label = "waiting...";

// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/5DDrOFNjd/';
function preload() {
 classifier = ml5.imageClassifier(modelURL + 'model.json');
}





function setup() {
    createCanvas(400, 600);
    //frameRate(50);
   video = createCapture(VIDEO);
  video.size(400, 600);
 flipVideo = ml5.flipImage(video);

  // STEP 2: Start classifying
  classifyVideo();
    opponents.push(new Opponent());
    player = new Player();
}


function classifyVideo() {
  // Flip the video!
  flipVideo = ml5.flipImage(video);
  classifier.classify(flipVideo, gotResults);
}

function draw() {
    background(44, 44, 44);
    image(flipVideo, 0, 0);


    // New road markings appear after certain number of frames
    if (frameCount % 25 === 0) {
    }

    // Show road markings
    for (var i = roadMarkings.length-1 ; i >= 0 ; i--) {
    
        // Remove road markings once the are off the screen
       
    }

    // New opponents appear after certain number of frames
    if (frameCount % 130 === 0) {
        opponents.push(new Opponent());
    }

    // Show opponents
    for (var j = opponents.length-1 ; j >= 0 ; j--) {
        opponents[j].show();
        opponents[j].update();

        if (opponents[j].overtakenBy(player) && opponents[j].isOvertakenBy === false) {
            score += 5;
            opponents[j].isOvertakenBy = true;
        }

        // If opponents collide with the player, they get destroyed
        if (opponents[j].hits(player)) {
            opponents[j].boom();
            opponents.splice(j, 1);

            // Penalty for collision is -10, and you loose one life
            score = (score >= 10)?(score-10):0;
            lives--;
        }
        // Remove opponents once the are off the screen
        else if (opponents[j].offscreen()) {
            opponents.splice(j, 1);
        }
    }

    // Show the player
    player.show();

    // Game controls
   controlCar();
    // Show player stats
    textSize(40);
    textAlign(LEFT);
    fill(255);
  textSize(30);
    text('Score: ' + score, 30, 60);
  textSize(12);
    text('Use palm and fist to control ', 30, 80);
  

    for (var j = 0 ; j < lives ; j++) {
        rect(30 + (j*70), height-60,40,40);
    }

 
 
 
    // Check if game is over
    if (lives === 0) {
        noLoop();

        textSize(60);
        textStyle(BOLD);
        textAlign(CENTER);
        fill(255);
        text('GAME OVER', width/2, height/2);
    }
}



function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  // Control the snake and classify again!
  controlCar();
  classifyVideo();
}



function controlCar(){
   if (label === "Right") {
    player.turnRight();
  } else if (label === "Left") {
    player.turnLeft();
  }
}
