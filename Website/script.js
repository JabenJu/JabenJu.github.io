let grid_items = document.getElementsByClassName("grid-item");
let grid_imgs = document.getElementsByClassName("hover-img");
let pageX = document.getElementById("x");
let pageY = document.getElementById("y");

function reveal(Event) {
    let grid_numb = Number(Event.target.id);
    for(x=0; x<grid_imgs.length; x++) {
        if(x != grid_numb) {
            grid_imgs[x].style.display = "none"
        }
    }
    // console.log(grid_numb)
    // console.log(grid_imgs[grid_numb])
    // console.log(grid_imgs[grid_numb].style.display + "here")
    
    let x_coor = event.clientX;     // Get the horizontal coordinate
    let y_coor = event.clientY;     // Get the vertical coordinate

    grid_imgs[grid_numb].style.display = "block";
    grid_imgs[grid_numb].style.left = x_coor+1+"px"
    grid_imgs[grid_numb].style.top = y_coor+1+"px" 
};

function unreveal(Event) {
    let grid_numb = Number(Event.target.id);
    grid_imgs[grid_numb].style.display = "none";
    // console.log(grid_numb)
};

function revealer(Event) {
    setTimeout(reveal(Event), 100)
};

function unrevealer(Event) {
    setTimeout(unreveal(Event), 500)
};

for(x=0; x <= grid_items.length; x++) {
    grid_items[x].addEventListener("mouseover", revealer);
    grid_items[x].addEventListener("mouseleave", unrevealer);
    grid_items[x].id = x;
};



