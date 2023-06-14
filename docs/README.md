# Conway's Game of Life

## Introduction
This is an implementation of the 2D cellular automaton, Conway's Game of Life. Conway's Game of Life implements rules
loosly based on real world systems, such as overpopulation, starvation, and reproduction. The Game of Life was proposed by John Conway in 1970.
## Rules
The game follows these rules:

    1. If you are alive, and have less than two live neighbors, you die. (underpopulation)
    2. If you are alive and have more than three live neighbors, you die. (overpopulation)
    3. If you are dead, and have exactly three live neighbors, you become a live cell. (reproduction)
    4. If you are alive, and have two or three live neighbors, you survive to the next generation.

## Implementation
I started this project as a way to brush up on my JavaScript skills. In all, this project uses HTML, CSS, and vanilla JavaScript. While the core logic of the game
works, there are some things that I would still like to improve:



    1. Right now, cells that move off of the grid, wrap around at the top. This creates problems with things like glider guns, where a stray glider can move into the gun and ruin
    the pattern. I think I could fix this later by having the model represent a larger world than what is shown to the user, and check if a cell is in the invisible part, change it
    to always be false. That way, these invisible rows will not have a large effect on the cells at the edge of the visible grid.

    2. I would like to have the size of the grid adjustable. Not only to have the potential to have the grid be larger for users that have impaired eyesight, but to also allow users
    to change the grid to only have the cells they need/want, this could see a potential performance improvement as the amount of cells that the application is keeping track of and iterating over to update the grid is smaller.

### Logic
The meat and potatoes of this project happens when the current generation is updated based on the rules of the Game of Life. I use two two-dimensional arrays, one to store a boolean model of the cells, and another to store the SVG rect objects in the DOM. When updating the grid, I loop over each cell in the model of the game. I count the number of live neighbors that the cell has and check what the new value of the cell should be based on the value of the cell and its count of live neighbors. I create a new two-dimensional array each generation and copy its values into the global model array. This poses a significant cost of memory; as the program executes, there are more and more two-dimensional arrays floating around. In the future, I would like to just swap two arrays instead of creating brand new arrays each generation to solve this issue.

### User Interaction
The interesting part of the Game of Life is setting a starting configuration and watching what happens over the course of the game. I use onclick events on each of the cells on the canvas to toggle its starting state within the model. The user can only interact with the game while it is not running, which can be toggled with the start and stop buttons on the page. I would like to add some indication on the screen that informs the user if the game is currently running or not.

### Improvements
In addition to the changes mentioned above, I would potentially like to move the front-end of this project to use React or another front-end framework. Using a component based model would simplify the code that I have written in index.js, and I think that the use of hooks and props to share state could improve the quality of this project.