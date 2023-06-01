/* index.js
 *
 * Handles the logic and set-up for the cellular automaton.
 * 
*/

// GLOBALS
var cells = new Array();
const svg = document.getElementById("cells");
const height = 700;
const width = 700;
const cell_size = 70;
const svgns = "http://www.w3.org/2000/svg";

// FUNCTIONS
function render_cells() {
    var id = 0;
    for(var y = 0; y < height; y+=cell_size) {
        for(var x = 0; x < width; x+=cell_size) {
            var cell = document.createElementNS(svgns, "rect");
            cell.setAttribute("x", x);
            cell.setAttribute("y", y);
            cell.setAttribute("width", cell_size);
            cell.setAttribute("height", cell_size);
            cell.setAttribute("id", toString(id));
            svg.appendChild(cell);
            cells.push(cell);
        }            
    }
}
