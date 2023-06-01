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
const cell_size = 70;
const svgns = "http://www.w3.org/2000/svg";
const neighbor_diffs = [
    (-1, -1), (0, -1), (1, -1),
    (-1, 0), (1, 0),
    (-1, 1), (0, 1), (1, 1)];
var running = false;

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
            var liveness = Math.random() < 0.5;
            var cell = document.createElementNS(svgns, "rect");
            cell.setAttributeNS(null, "x", x);
            cell.setAttributeNS(null, "y", y);
            cell.setAttributeNS(null, "width", cell_size);
            cell.setAttributeNS(null, "height", cell_size);
            cell.setAttributeNS(null, "id", toString(id));
            cell.setAttributeNS(null, "stroke", "black");
            if(liveness) {
                cell.setAttributeNS(null, "fill", "green");
            }else {
                cell.setAttributeNS(null, "fill", "red");
            }
            svg.appendChild(cell);
            var c = new Cell(cell, liveness);
            cell_row.push(c);
            model_row.push(c.alive);
        }
        model.push(model_row);
        cells.push(cell_row);
    }
    console.log(cells);
    console.log(model);
}

/*
 * Validates position of indices in 2d array
*/
function validate_index(x, y) {
    if(x < 0 || x >= cells[0].length || y < 0 || y >= cells.length) {
        return false;
    }
    return true;
}

/*
 * Find neighbors of a given cell.
*/
function check_neighbors(x, y) {
    var live = 0;
    for(var diff in neighbor_diffs) {
        var neighbor_x = x + neighbor_diffs[diff][0];
        var neighbor_y = y + neighbor_diffs[diff][1];
        if(validate_index(neighbor_x, neighbor_y)) {
            if(model[neighbor_y][neighbor_x]) {
                live += 1;
            }
        }
    }
    return live;
}

/*
 * Change liveness of model to implement rules
*/
function rules() {
    for(var y = 0; y < model.length; y++) {
        for(var x = 0; x < model[0].length; x++) {
            var live = get_neighbors(x, y);
            if(model[y][x] && live < 2) {
                model[y][x] = false;
            }else if(model[y][x && live > 3]) {
                model[y][x] = false;
            }else if(!model[y][x] && live == 3) {
                model[y][x] = true;
            }
        }
    }
}

/*
 * Update view based on model
*/
function update() {
    for(var y = 0; y < model.length; y++) {
        for(var x = 0; x < model[0].length; x++) {
            var cell = cells[y][x];
            if(model[y][x]) {
                cell.element.setAttributeNS(null, "fill", "green");
            }else {
                cell.element.setAttributeNS(null, "fill", "red");
            }
        }
    }
}

/*
 * On window load, access necessary DOM elements.
*/
window.onload = function() {
    svg = document.getElementById("cells");
    render_cells();
}

