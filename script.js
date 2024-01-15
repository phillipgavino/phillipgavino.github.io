let longhornImage;
let angle = 0;

function preload() {
	longhornImage = loadImage('longhorn.png');
	
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER); // Ensures the image rotates around its center
}

function draw() {
    background(255);

    const imgX = width / 2;
    const imgY = height / 2;

    if (mouseX > imgX - longhornImage.width / 2 && mouseX < imgX + longhornImage.width / 2 &&
        mouseY > imgY - longhornImage.height / 2 && mouseY < imgY + longhornImage.height / 2) {
        angle += 0.1; // Adjust rotation speed as needed
    }

    push();
    translate(imgX, imgY);
    rotate(angle);
    image(longhornImage, 0, 0);
    pop();
}