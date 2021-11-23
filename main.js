song="";
song1="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
song_status = "";
song1_status = "";
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song1 = loadSound("Lovely (1).mp3");
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, moadelLoded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);

    };
}
function moadelLoded()
{
    console.log('PoseNet Is Initialized');
}
function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
{
    circle(leftWristX,leftWristY,20);
    song.stop();
    if (song_status==false)
    {
        song1.play();
        document.getElementById("song").innerHTML = "Playing - Lovelysong";
    }
}

if(scoreRightWrist > 0.2)
{
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if (song_status==false)
    {
        song.play();
        document.getElementById("song").innerHTML = "Playing - Harrypottersong";
    }
}
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}