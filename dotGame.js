 // script for the dot and boxes game
 // resource that help me make this game is from https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
 // @cite https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
 // Game parameters
 const fps = 10; // frames per second
 const gridSize = 3; // number of rows and columns
 const height = 700; // pixels
 
 // Derived Dimensions
 const cell_size_text = 25
 const top_text = 31;
 const color_text_size = 21;
 const width =640;
 const margin = 191// top margin for score, names, etc..
 const cell = 127; // size of cells
 const stroke = 12; // stroke width

 
 // Colors
 const player1_color = "lightyellow";
 const player2_color = "lightsalmon";
 const player3_color = "lightgreen";
 const not_player_turn = "grey";
 const gameEnd_color = "white";
 // text
 const p2_color = "P2's color";
 const player1_name = "Player 1";
 const p1_color = "P1's color";
 const player2_name = "Player 2";
 const p3_color = "P3's color";
 const player3_name = "Player 3";
 const tie_message = "Draw!";
 const win_message = "Wins!";
 
 
 // definitions
 const Side = {
     BOTTOM: 0,
     LEFT: 1,
     RIGHT: 2,
     TOP: 3
 }
 
 // set the game canvas, resource from https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
 var canvas = document.createElement("canvas");
 canvas.height = height;
 canvas.width = width;
 document.body.appendChild(canvas);
 var canvRect = canvas.getBoundingClientRect();


 
 
 // set the game context
 var context = canvas.getContext("2d");
 context.lineWidth = stroke;
 context.textAlign = "center";
 context.textBaseline = "middle";
 
 //  game variables
 var currentCells; 
 var squares;
 var scorePlay2, scorePlay1, scorePlay3, scorePlay3;
 var timeEnd;
 var player;
 var colPlay1, colPlay2, colPlay3;
 var gameEnd;
 var gameWinner;
 
 // start a new game
 newGame();
// set up the loop to udpate the board every interval so it is not glitchy
setInterval(updateBoard, 100);
 
 // event handlers, resource from https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
 canvas.addEventListener("mousemove", highlightGrid); // maybe function call?
 canvas.addEventListener("click", click);
 
// function for a new game
 function newGame(){
    // variables for each game
    player = 0;
    scorePlay2 = 0;
    scorePlay1 = 0;
    scorePlay3 = 0;
    gameWinner = "";
    gameEnd = false;
    currentCells = [];
     
 
 
     // set up the squares, resource from https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
     squares = [];
     for (let i = 0; i < gridSize; i++){
         squares[i] = [];
         for (let j = 0; j < gridSize; j++){
             squares[i][j] = new game_Square(getX(j), getY(i), cell, cell);
         }
     }
 }


 // fucntion to select the sides when mouse click
 function click(/** @type {MouseEvent} */ ev){
     selectSide();
 }
 
 function drawBoard() {
     context.fillStyle = "DarkSlateBlue";
     context.strokeStyle = "plum";
     context.fillRect(0, 0, width, height);
    
 }
 

 // function to draw the grides and dots
 function drawGrid() {
     for (let i = 0; i < gridSize + 1; i++){
         for (let j = 0; j < gridSize + 1; j++){
            context.fillStyle = "thistle";
            context.beginPath();
            context.arc(getX(j), getY(i),12,0,6);
            context.fill();
         }
     }
 }
 
 function drawLine(x0, y0, x1, y1, color){
     context.strokeStyle = color;
     context.beginPath();
     context.moveTo(x0, y0);
     context.lineTo(x1, y1);
     context.stroke();
 }
 
 // function to display the text and scores 
 function drawScores(){
    // setting the color of the fonts according to who's turn it is
    if (player == 0){
        colPlay1 = player1_color;
        colPlay2 = not_player_turn;
        colPlay3 = not_player_turn;
    }else if (player == 1){
        colPlay1 = not_player_turn;
        colPlay2 = player2_color;
        colPlay3 = not_player_turn;
    }else if (player == 2){
        colPlay1 = not_player_turn;
        colPlay2 = not_player_turn;
        colPlay3 = player3_color;
    }
    // displaying the player name and score
     displayText(player1_name, colPlay1, top_text, width * 0.25, margin * 0.25);
     displayText(scorePlay1, colPlay1, top_text * 2, width * 0.25, margin * 0.6);
     displayText(player2_name, colPlay2, top_text, width * 0.5, margin * 0.25);
     displayText(scorePlay2, colPlay2, top_text * 2, width * 0.5, margin * 0.6);
     displayText(player3_name, colPlay3, top_text, width * 0.75, margin * 0.25);
     displayText(scorePlay3, colPlay3, top_text * 2, width * 0.75, margin * 0.6);
     
    // text for showing the color of each player 
     displayText(p1_color, player1_color, color_text_size, width * 0.1, margin * 3.2);
     displayText(p3_color, player3_color, color_text_size, width * 0.1, margin * 3.4);
     displayText(p2_color, player2_color, color_text_size, width * 0.1, margin * 3.3);
    

     // for displaying which player won after the end game popup 
    if (gameEnd){

        // displaying the player name and scorein white after the game ends 
     displayText(player1_name, gameEnd_color, top_text, width * 0.25, margin * 0.25);
     displayText(scorePlay1,gameEnd_color, top_text * 2, width * 0.25, margin * 0.6);
     displayText(player2_name, gameEnd_color, top_text, width * 0.5, margin * 0.25);
     displayText(scorePlay2,gameEnd_color, top_text * 2, width * 0.5, margin * 0.6);
     displayText(player3_name, gameEnd_color, top_text, width * 0.75, margin * 0.25);
     displayText(scorePlay3, gameEnd_color, top_text * 2, width * 0.75, margin * 0.6);
        
        if((scorePlay2 == scorePlay1) && scorePlay2 > scorePlay3){  
            displayText("Draw Between player 1 and 2", not_player_turn, top_text, width * 0.5, margin * 3.2);
           
        }else if ((scorePlay2 > scorePlay1) && (scorePlay2 > scorePlay3) ){
           displayText(player2_name, not_player_turn, top_text, width * 0.5, margin * 3.2);
           displayText(win_message, not_player_turn, top_text, width * 0.5, margin * 3.4);
          
        }else if ((scorePlay2 < scorePlay1) && (scorePlay1 > scorePlay3)){
           displayText(player1_name, not_player_turn, top_text, width * 0.5, margin * 3.2);
           displayText(win_message, not_player_turn, top_text, width * 0.5, margin * 3.4);
               

        }else if ((scorePlay2 < scorePlay3) && (scorePlay1 < scorePlay3)){
           displayText(player3_name, not_player_turn, top_text, width * 0.5, margin * 3.2);
           displayText(win_message, not_player_turn, top_text, width * 0.5, margin * 3.4);
           
        }else if ((scorePlay1 == scorePlay3) && scorePlay1 == scorePlay2){
        displayText("DRAW Between all Players", not_player_turn, top_text, width * 0.5, margin * 3.2);
         
            
          }else if ((scorePlay2 == scorePlay3) && scorePlay2 > scorePlay1){
            displayText("Draw Between player 2 and 3", not_player_turn, top_text, width * 0.5, margin * 3.2);
            
          }else if ((scorePlay1 == scorePlay3) && scorePlay1 > scorePlay2){
            displayText("Draw Between player 2 and 3", not_player_turn, top_text, width * 0.5, margin * 3.2);
            
          }
    }
   
 }
 



// fucntion to draw the squares
 function drawTheSquares(){
     for(let row of squares){
         for (let square of row){
             square.drawSides();
             square.drawFill();
         }
     }
 }
 
 // for formating the texts in the game
 function displayText(text, color, size, x, y){
     context.font = size + "px Arial";
     context.fillStyle = color;
     context.fillText(text, x, y);
 }
 

 // fucntion for return the appropriate color for that player
 function getColor(players){
     if(players == 0){
         return player1_color;
     }else if(players == 1){
         return player2_color;
     }else if (players == 2){
        return player3_color;
     }
 }
 
 function getX(col) {
     return 127 * (col + 1);
 }
 
 function getY(row) {
     return 191 + cell * row;
 }
 // function for highlighting given the mouse location 
 function highlightGrid(/** @type {MouseEvent} */ ev){
     
     // get mouse position relative to the canvas
     let x = ev.clientX - canvRect.left;
     let y = ev.clientY - canvRect.top;
 
     // highlight the squares side
     highlightSide(x, y);
 }
 

 // function for hightlighting the sides, resource from https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
 function highlightSide(x, y){
     // clear previous highlighting
     for(let row of squares){
         for (let square of row){
             square.highlight = null;
         }
     }
 
     // check each cell
     let rows = squares.length;
     let cols = squares[0].length;
     currentCells = [];
     Outer_For_loop: for(let i = 0; i < rows; i++){
         for (let j = 0; j < cols; j++){
             if(squares[i][j].contains(x,y)){
                 // highlight current
 
                 let side = squares[i][j].highlightSide(x,y);
                 if(side != null){
                     currentCells.push({row: i, col: j});
                 }
                 // determine neighbour
                 let row = i, col = j, highlight, neighbour = true;
                 if(side == Side.LEFT && j > 0){
                     col = j - 1;
                     highlight = Side.RIGHT;
                 }else if(side == Side.BOTTOM && i < rows - 1){
                    row = i + 1;
                    highlight = Side.TOP;
                 }else if(side == Side.TOP && i > 0){
                     row = i - 1;
                     highlight = Side.BOTTOM;
                }else if(side == Side.RIGHT && j < cols-1){
                    col = j + 1;
                    highlight = Side.LEFT;
                }else{
                     neighbour = false;
                 }
                 // highlight neighbour
                 if(neighbour){
                     squares[row][col].highlight = highlight;
                     currentCells.push({row: row, col: col});
                 }
 
                 // no need to continue
                 break Outer_For_loop;
             }
         }
     }
 }
 

  // create the Square object constructor, resource from https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
  function game_Square(x, y, w, h) {
    //how many selected
    this.numSelected = 0;
    // onwer of that square
    this.owner = null;
    this.bottomSide = {owner: null, selected: false};
    this.leftSide = {owner: null, selected: false};
    this.rightSide = {owner: null, selected: false};
    this.topSide = {owner: null, selected: false};
    // boundaries 
    this.right = x + w;
    this.top = y;
    this.highlight = null;
    this.w = w;
    this.h = h;
    this.bottom = y + h;
    this.left = x;


     
    

    this.contains = function(x, y){
        return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
    }
    // function for filling out the square
    this.drawFill = function(){
    // if the sqaure if there is no player that owns it then don't fill 
        if(this.owner == null){
            return;
        }
        // color the sqaures to the right player if they close that square
        context.fillStyle = getColor(this.owner);
        // fill the square 
        context.fillRect(
            this.left+ stroke, this.top + stroke, this.w - stroke * 2, this.h - stroke * 2    
        )
    
    }

  
    // function for hightlighting the lines when your cursor is near
     this.drawSides = function(){
         // highlighting
        
            if(this.highlight != null){
                if (this.highlight == Side.BOTTOM){
                    drawLine(this.left, this.bottom, this.right, this.bottom,getColor(player));
                }else if(this.highlight == Side.LEFT){
                    drawLine(this.left, this.top, this.left, this.bottom, getColor(player));
                }else if(this.highlight == Side.RIGHT){
                    drawLine(this.right, this.top, this.right, this.bottom,getColor(player));
                }else if(this.highlight == Side.TOP){
                    drawLine(this.left, this.top, this.right, this.top,getColor(player));
                }
                //this.drawSide(this.highlight, getColor(player));
            }
        
         // selected sides
         if(this.bottomSide.selected){
             drawLine(this.left, this.bottom, this.right, this.bottom, getColor(this.bottomSide.owner));
         }
         if(this.leftSide.selected){
             drawLine(this.left, this.top, this.left, this.bottom, getColor(this.leftSide.owner));
         }
         if(this.rightSide.selected){

             drawLine(this.right, this.top, this.right, this.bottom, getColor(this.rightSide.owner));
         }
         if(this.topSide.selected){
            // this.drawSide(Side.TOP, getColor(this.topSide.owner));
             drawLine(this.left, this.top, this.right, this.top, getColor(this.topSide.owner));
         }
     }
 
     this.highlightSide = function(x, y){
         // calculate the distances to each side
         let dBot = this.bottom - y;
         let dLeft = x - this.left;
         let dRight = this.right - x;
         let dTop = y - this.top;
 
         // determine closest value
         let dClosest = Math.min(dBot, dLeft, dRight, dTop);
 
         // highlight the closest if not already selected
         // the reason to check if it is not selected to stop players to make illegal highlights of already choosen lines
         if (dClosest == dBot && !this.bottomSide.selected){
             this.highlight = Side.BOTTOM;
         }else if(dClosest == dLeft && !this.leftSide.selected){
             this.highlight = Side.LEFT;
         }else if(dClosest == dRight && !this.rightSide.selected){
             this.highlight = Side.RIGHT;
         }else if(dClosest == dTop && !this.topSide.selected){
             this.highlight = Side.TOP;
         }
 
         // return the highlighted side
         return this.highlight;
     }
 
     this.selectSide = function(){
         if(this.highlight == null){
             return;
         }
         // select the highlighted side
         switch(this.highlight){
            case Side.TOP:
                 this.topSide.owner = player;
                 this.topSide.selected = true;
                 break;
             case Side.BOTTOM:
                 this.bottomSide.owner = player;
                 this.bottomSide.selected = true;
                 break;
             case Side.RIGHT:
                 this.rightSide.owner = player;
                 this.rightSide.selected = true;
                 break;
             
            case Side.LEFT:
                 this.leftSide.owner = player;
                 this.leftSide.selected = true;
                 break;
         }
         this.highlight = null;
         //increase the number of selected
         this.numSelected++;
         // set owner if the square is filled
         if(this.numSelected == 4){
            // check which player got the square
             this.owner = player;
      
             // increment score for the player that got the sqaure
             if(player == 0){
                 scorePlay1++;
             }else if(player == 1){
                 scorePlay2++;
             }else if (player == 2){
                scorePlay3++;
             }
             // return true if the squuare is filled
             return true;
         }
 
         // return false if the square is not filled 
         return false;
 
     }
 
 }
 // when a side has been slected (player click on a side), resource from https://www.youtube.com/watch?v=vAeysIanWTw&t=3671s&ab_channel=Mt.FordStudios
 function selectSide(){
     if(currentCells == null || currentCells.length == 0){
         return;
     }
     // select the side(s)
     let filledSquare = false;
     for (let cell of currentCells){
        // check if the square is filled or not
         if(squares[cell.row][cell.col].selectSide()){
             filledSquare = true;
         }
     }
     currentCells = [];
 
     // check for winner
     if(filledSquare){
        // if all squares have been filled
         if(scorePlay1 + scorePlay2 + scorePlay3 == gridSize * gridSize){
           gameEnd = true;
            // appropriate alerts for the winners
         if((scorePlay2 == scorePlay1) && scorePlay2 > scorePlay3){  

           alert("DRAW Between Player 1 and Player 2");
        }else if ((scorePlay2 > scorePlay1) && (scorePlay2 > scorePlay3) ){

          alert("WINNER is Player 2");
          
        }else if ((scorePlay2 < scorePlay1) && (scorePlay1 > scorePlay3)){
               alert("WINNER is Player 1");

        }else if ((scorePlay2 < scorePlay3) && (scorePlay1 < scorePlay3)){

           alert("WINNER is Player 3");
        }else if ((scorePlay2 == scorePlay3) && scorePlay2 > scorePlay1){
            
            alert("DRAW Between Player 2 and Player 3");
            
          }else if ((scorePlay1 == scorePlay3) && scorePlay1 > scorePlay2){
         
            alert("DRAW Between Player 1 and Player 3");
            
          }else if ((scorePlay1 == scorePlay3) && scorePlay1 == scorePlay2){
      
            alert("DRAW Between All Players");
            
          }
            
        
         }
         // if not all the sqaures are filled, change player turns in the according order 
     }else{
        // if player 1's turn then change it to player's 2 turn
        if (player == 0){
            player++;

        // if player 2's turn then change it to player's 3 turn
        }else if (player == 1){
            player++;
            
         // if player 3's turn then change it to player's 1 turn
        }else if (player == 2){
            player -= 2;
        }
        
        
     }
 
     
 }
 

 // function to show the game board 
 function updateBoard() {
    drawBoard();
    drawTheSquares();
    drawGrid();
    drawScores();
}
 