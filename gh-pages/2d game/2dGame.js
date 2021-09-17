 //initialize references to important elements
 var character = document.querySelector(".character");
 var map = document.querySelector(".map");
 var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"))

//Character state variables
var x = 0;
var y = 0;

//Variable to hold which arrow keys are being held
var held_directions = [];

//object that sets keys to values, direction.up = "up" which can be used to check for the up key
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
}

//sets keys to values
const keys = {
    ArrowLeft: directions.left,
    a: directions.left, 
    ArrowUp: directions.up,
    w: directions.up,
    ArrowRight: directions.right,
    d: directions.right,
    ArrowDown: directions.down,
    s: directions.down
}

//How fast the character moves in pixels per frame
var speed = 1.5;

//determine if keys are held down and place character accordingly
function placeCharacter() {
    //parseInt converts from string to integer, but allows for things like 1px to return 1
    //getComputedStyle gets the CSS properties of an element after applying stylesheets
    //getPropertyValue gets the value of a CSS property, in this case the --pixel-size value which is based off screen width
    pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"))

    //sets an integer equal to the first directional input
    const held_direction = held_directions[0];
    if (held_direction){
        //changes the positioning of the character based on the held direction
        if(held_direction == directions.right) {x += speed; console.log("moveRight")}
        if(held_direction == directions.left) {x -= speed; console.log("moveLeft")}
        if(held_direction == directions.up) {y -= speed}
        if(held_direction == directions.down) {y += speed}
        //makes the character face the direction held
        character.setAttribute("facing", held_direction)
        console.log(character.attributes.facing)
    }
    //makes the character play a walking animation when a direction is held
    character.setAttribute("walking", held_direction ? "true" : "false")

    //sets limits to simulate walls
    var leftLimit = -8;
    var rightLimit = (16 * 11)+8;
    var topLimit = -8;
    var bottomLimit = (16 * 7)+12;

    //if the character reaches a wall, stop them from going further
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }

    //centers the character by shifting the map
    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42

    //most efficent way to move stuff every frame, translate it based on x and y counters
    character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0)`;
    //we need to flip the values so the map moves the other dire''tion and shift it so the character is centered
    map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0)`;
}

//this is the function that runs every "tick", uses the placeCharacter function to move the character then uses recursion to update it every tick
function step() {
    placeCharacter();
    //requestAnimationFrame is used to call a function before the browser ticks and updates
    window.requestAnimationFrame(() => {
        step();
    });
}
step()

//eventListeners, I love these, thank you Gabe. listens for a key to be pressed
document.addEventListener("keydown", (e) => {
    //determine what key was pressed
    var dir = keys[e.key];
    //if that key isn't in the held_directions array..
    if (dir && held_directions.indexOf(dir) === -1) {
        //..then add it to the array
        held_directions.unshift(dir)
        console.log(dir)
    }
});

//when a key is unpressed, we want to remove it from the array
document.addEventListener("keyup", (e) => {
    var dir = keys[e.key];
    //finds where the released key is in the index
    var index = held_directions.indexOf(dir);
    //if the released direction is in the index (whenever it's index location is not -1)
    if (index > -1) {
        //remove that held direction from the array
        held_directions.splice(index, 1)
        console.log(dir+"removed")
    }
});