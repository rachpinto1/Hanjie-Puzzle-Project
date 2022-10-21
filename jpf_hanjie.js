"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Tutorial Case

   Author: 
   Date:   

   Global Variables
   ================
   
   puzzleCells
      References the TD cells within the Hanjie table grid.
   
   cellBackground
      Stores the current background color of the puzzle
      cells during the mouseover event.
      
      
   Function List
   =============

   init()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   swapPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setBackground(e)
      Sets the background color of the puzzle cells during the mousedown
      event

   extendBackground(e)
      Extends the background color of the original puzzle cell during
      the mouseenter event.
      
   endBackground()
      Ends the action of extending the cell backgrounds in response to the
      mouseup event.

   drawPuzzle(hint, rating, puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.
	
*/

// Run the init() function when the page loads
window.onload = init;

let puzzleCells;
let cellBackground;

// Definition of the init() function
function init() {
   // Insert the title for the first puzzle
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";

   // Insert the HTML code for the first puzzle table
   document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

   // Add event handlers for the puzzle buttons
   let puzzleButtons = document.getElementsByClassName("puzzles");
   for(let i = 0; i < puzzleButtons.length; i++) {
      puzzleButtons[i].onclick = swapPuzzle;
   } // end of for loop

   // call the setupPuzzle function
   setupPuzzle();

   // add an event listener for the mouseup event
   document.addEventListener("mouseup", endBackground);

   // add an event listener to the Show Solution button
   document.getElementById("solve").addEventListener("click", function(){
      // remove the inline background color style from cell
      for(let i = 0; i < puzzleCells.length; i++) {
         puzzleCells[i].style.backgroundColor = "";
      } // end of for loop
   });
} // end of init() function

// Definition of the swapPuzzle() function
function swapPuzzle(e) {
   // variable that references which puzzle button was clicked based on it's ID
   let puzzleID = e.target.id;
   // grab the value attribute from event's target and put it in a variable
   let puzzleTitle = e.target.value;
   document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

   // switch statement to determine which puzzleID this function actually has
   switch(puzzleID) {
      case "puzzle1":
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
         break;
      case "puzzle2":
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
         break;
      case "puzzle3":
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
         break;
   } // end of switch statement

   setupPuzzle();

} // end of swapPuzzle() function

// Definition of the setupPuzzle() function
function setupPuzzle() {
   // Match all of the data cells in the puzzle
   puzzleCells = document.querySelectorAll("table#hanjieGrid td");
   // Loop that will set the initial color of each cell to gold
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";
      // add an event handler to each cell for the mousedown event which will change the background color
      puzzleCells[i].onmousedown = setBackground;
      // Use a pencil image as the cursor for all puzzle cells
      puzzleCells[i].style.cursor = "url('jpf_pencil.png'), pointer";
   } // end of for loop

   // Create array variables of all the filled and all the empty cells
   let filled = document.querySelectorAll("table#hanjieGrid td.filled");
   let empty = document.querySelectorAll("table#hanjieGrid td.empty");

   // Create an event listner for the peek button to highlight incorrect cells
   document.getElementById("peek").addEventListener("click", function() {
         // Display incorrect white cells in pink
         for(let i = 0; i < filled.length; i++) {
            if(filled[i].style.backgroundColor === "rgb(255, 255, 255)") {
               filled[i].style.backgroundColor = "rgb(255, 211, 211)";
            } //end of if statement
         } // end of filled for loop

         // Display incorrect gray cells in red
         for(let i = 0; i < empty.length; i++) {
            if(empty[i].style.backgroundColor === "rgb(101, 101, 101)") {
                  empty[i].style.backgroundColor = "rgb(255, 101, 101)";
            }  //end of if statement 
         } // end of empty for loop

         // Remove the hints after 0.5 seconds
         setTimeout(function(){
            // Change pink cells to white and red cells to gray
            for(let i = 0; i < puzzleCells.length; i++){
               if(puzzleCells[i].style.backgroundColor === "rgb(255, 211, 211)") {
                  puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)";
               }

               if(puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)") {
                  puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
               }

            } // end of for loop
         }, 500); // end of the timeout anonymous function
   }); 

   // Check the puzzle solution when the user lets go of the mouse button
   document.getElementById("hanjieGrid").addEventListener("mouseup", function(){
         let solved = true;

         // loop through every puzzle cell to look at the color and determine if the cell is correct or not
         for(let i = 0; i < puzzleCells.length; i++) {
            if((puzzleCells[i].className === "filled" && puzzleCells[i].style.backgroundColor !== "rgb(101, 101, 101)") || (puzzleCells[i].className === "empty" && puzzleCells[i].style.backgroundColor === "rgb(101, 101, 101)")) {
               solved = false;
               break;
            } // end of if statement
         } // end of for loop
         if(solved){
            window.alert("Congrats! You solved the puzzle!!!!!!!!!");
         }
   });


} // end of setupPuzzle() function

// defintion of the setBackground() function
function setBackground(e) {
   
   let cursorType;
   // Set the cells background based on the keyboard key
   if(e.shiftKey) {
      cellBackground = "rgb(233, 207, 29)";
      cursorType = "url(jpf_eraser.png), cell";
   } else if(e.altKey) {
      cellBackground = "rgb(255, 255, 255)";
      cursorType = "url('jpf_cross.png'), crosshair";
   } else {
      cellBackground = "rgb(101,101,101)";
      cursorType = "url('jpf_pencil.png'), pointer";
   }

   e.target.style.backgroundColor = cellBackground;

   // Use a loop to create an event listener for every puzzle cell
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].addEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = cursorType;
   } // end of for loop

   // Prevent the default action of selecting table text
   e.preventDefault();

} // end of setBackground() function

// Definition of the extendBackground() function
function extendBackground(e) {
   e.target.style.backgroundColor = cellBackground;
} // end of extendBackground() function

// Definition of the endBackground() function
function endBackground() {
   // loop through the puzzleCells array and remove the event listener for every puzzle cell
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].removeEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = "url('jpf_pencil.png'), pointer";
   }
} // end of endBackground() function
         
/* ================================================================= */

function drawPuzzle(hint, rating, puzzle) {
   
   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}