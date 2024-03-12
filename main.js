function preload() {
    status1 = ""
}


function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    video = createCapture(VIDEO);
    video.size(635, 415)
    video.hide();
}

function modelLoaded() {
    console.log("the model has been loaded")
    objectDetector.detect(video, gotitem)
    status1 = true
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status:Dectecting"
}




label = "-"
confidence = '-'


function gotitem(error, results) {
    console.log(results)
    length = results.length
    console.log(length)
    objects = results
    document.getElementById("numofobjects").innerHTML = "Number of Objects Found:" + " " + length


}

function stop1() {
    status1 = ""
}


function draw() {
    image(video, 0, 0, 635, 415);


    if (status1 != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotitem)
        for (let i = 0; i < length; i++) {
            label = objects[i].label
            word = document.getElementById("nameofobject").value
            if(word == label){
                document.getElementById("status").innerHTML = word + " " + "dectected"
                confidence = floor(objects[i].confidence * 100)
                //console.log(label)
                //console.log(confidence)
                fill(r,g,b)
                text(label + " " + confidence + "%", objects[i].x, objects[i].y)
                textSize(30)
                noFill()
                stroke(r,g,b)
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            }

        }
    }

}

