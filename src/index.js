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

/*
 * Class to store element and liveness of each cell.
*/
class Cell {
    constructor(element) {
        this.element = element;
        this.alive = true;
    }
}

/*
 * Renders the cells to the svg. Plan to implement on page load.
*/
function render_cells() {
    var id = 0;
    for(var y = 0; y < height; y+=cell_size) {
        //creating a row array to store model of cells
        var row = new Array();
        for(var x = 0; x < width; x+=cell_size) {
            var cell = document.createElementNS(svgns, "rect");
            cell.setAttributeNS(null, "x", x);
            cell.setAttributeNS(null, "y", y);
            cell.setAttributeNS(null, "width", cell_size);
            cell.setAttributeNS(null, "height", cell_size);
            cell.setAttributeNS(null, "id", toString(id));
            cell.setAttributeNS(null, "fill", "none");
            cell.setAttributeNS(null, "stroke", "black");
            svg.appendChild(cell);
            var c = new Cell(cell);
            cells.push(c);
            row.push(c.alive);
        }
        model.push(row);
    }
}

/*
 * On window load, access necessary DOM elements.
*/
window.onload = function() {
    svg = document.getElementById("cells");
    render_cells();
}

