/* index.js
 *
 * Handles the logic and set-up for the cellular automaton.
 * 
*/

// GLOBALS
var cells = new Array();
var model = new Array();
var svg = null;
const height = 700;
const width = 700;
const cell_size = 10;
const rows = height / cell_size;
const cols = width / cell_size;
const svgns = "http://www.w3.org/2000/svg";
const neighbor_diffs = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]];
var running = null;
var is_running = false;
var start_button = null;
var stop_button = null;

/*
 * Class to store element and liveness of each cell.
*/
class Cell {
    constructor(element, alive) {
        this.element = element;
        this.alive = alive;
    }
}

/*
 * Renders the cells to the svg. Plan to implement on page load.
*/
function render_cells() {
    var id = 0;
    for(var y = 0; y < height; y+=cell_size) {
        //creating a row array to store model of cells
        var model_row = new Array();
        var cell_row = new Array();
        for(var x = 0; x < width; x+=cell_size) {
            //var liveness = Math.random() < 0.5;
            var liveness = false;
            var cell = document.createElementNS(svgns, "rect");
            cell.setAttributeNS(null, "x", x);
            cell.setAttributeNS(null, "y", y);
            cell.setAttributeNS(null, "width", cell_size);
            cell.setAttributeNS(null, "height", cell_size);
            cell.setAttributeNS(null, "id", toString(id));
            cell.setAttributeNS(null, "stroke", "black");
            if(liveness) {
                cell.setAttributeNS(null, "fill", "black");
            }else {
                cell.setAttributeNS(null, "fill", "white");
            }
            svg.appendChild(cell);
            var c = new Cell(cell, liveness);
            cell_row.push(c);
            model_row.push(c.alive);
        }
        model.push(model_row);
        cells.push(cell_row);
    }
}

/*
 * Changes status of the cell on click
*/
document.onclick = function(e) {
    if(e.target.tagName === "rect") {
        if(is_running) return;
        var clicked_x = e.target.getAttribute("x") / cell_size;
        var clicked_y = e.target.getAttribute("y") / cell_size;
        model[clicked_y][clicked_x] = !model[clicked_y][clicked_x];
        update();
    }
}

/*
 * Validates position of indices in 2d array
*/
function validate_index(x, y) {
    return x >= 0 && x < cols && y >= 0 && y < rows;
}

/*
 * Find neighbors of a given cell.
*/
function check_neighbors(x, y) {
    var live = 0;
    for(var diff in neighbor_diffs) {
        var neighbor_x = (x + neighbor_diffs[diff][0] + rows) % rows;
        var neighbor_y = (y + neighbor_diffs[diff][1] + cols) % cols;
        /*
        if(validate_index(neighbor_x, neighbor_y)) {
            if(model[neighbor_y][neighbor_x]) {
                live += 1;
            }
        }
        */
       if(model[neighbor_y][neighbor_x]) {
        live += 1;
       }
    }
    return live;
}

/*
 * Utility function to copy 2d array. Something like this may already exist, will look into it further later.
*/

function copy_2d(array_1) {
    var new_array = new Array();
    for(var row = 0; row < array_1.length; row++) {
        var new_row = new Array();
        for(var col = 0; col < array_1[row].length; col++) {
            new_row.push(array_1[row][col]);
        }
        new_array.push(new_row);
    }
    return new_array;
}

/*
 * Change liveness of model to implement rules
*/
function rules() {
    var new_model = new Array();
    for(var y = 0; y < model.length; y++) {
        var new_row = new Array();
        for(var x = 0; x < model[0].length; x++) {
            var live = check_neighbors(x, y);
            if(!model[y][x] && live == 3) {
                new_row.push(true);
            }else if(model[y][x] && (live < 2 || live > 3)) {
                new_row.push(false);
            }else {
                new_row.push(model[y][x]);
            }
        }
        new_model.push(new_row);
    }

    model = copy_2d(new_model);
}

/*
 * Update view based on model
*/
function update() {
    for(var y = 0; y < model.length; y++) {
        for(var x = 0; x < model[y].length; x++) {
            var cell = cells[y][x];
            if(model[y][x]) {
                cell.element.setAttributeNS(null, "fill", "black");
            }else {
                cell.element.setAttributeNS(null, "fill", "white");
            }
        }
    }
}

/*
 * Run the game. Will be called every second using setInterval.
*/
function run() {
    rules();
    update();
}

/*
 * On window load, access necessary DOM elements.
*/
window.onload = function() {
    svg = document.getElementById("cells");
    start_button = document.getElementById("start");
    stop_button = document.getElementById("stop");
    render_cells();
}

function start() {
    if(is_running) {
        return;
    }else {
        running = setInterval(run, 100);
        is_running = true;
    }
}

function stop() {
    if(!is_running) {
        return;
    }else {
        clearInterval(running);
        is_running = false;
    }
}