(function () {
    var squares = [], 
        EMPTY = "\xA0",
        score,
        moves,
        theTurn = "X",
        turn = "X",
        oldOnload,
        center = false,
        remaining = [1,2,4,8,16,32,64,128,256],
        vertices = [1,4,64,256],
        normals = [2,8,32,128],
        row1 = [1,2,4], 
        row3 = [64,128,256], 
        col1 = [1,8,64],
        col3 = [4,32,256], 
        wins = [7, 56, 448, 73, 146, 292, 273, 84],
        startNewGame = function () {
        turn = theTurn;
        score = {"X": 0, "O": 0};
        moves = 0;
        for (var i = 0; i < squares.length; i += 1) {
            squares[i].firstChild.nodeValue = EMPTY;
        }
        center = false;
        remaining = [1,2,4,8,16,32,64,128,256];
        vertices = [1,4,64,256];
        normals = [2,8,32,128];
        row1 = [1,2,4]; 
        row3 = [64,128,256]; 
        col1 = [1,8,64];
        col3 = [4,32,256];
        //turn = "O";
        //computer();
    },
    win = function (score) {
        var i;
        for (i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },
    set = function () {
        if (this.firstChild.nodeValue !== EMPTY) {
            return;
        }
        remaining = remaining.filter(item => item !== Number(this.id));
        vertices = vertices.filter(item => item !== Number(this.id));
        normals = normals.filter(item => item !== Number(this.id));
        row1 = row1.filter(item => item !== Number(this.id));
        row3 = row3.filter(item => item !== Number(this.id));
        col1 = col1.filter(item => item !== Number(this.id));
        col3 = col3.filter(item => item !== Number(this.id));
        this.firstChild.nodeValue = turn;
        moves += 1;
        score[turn] += Number(this.id);
        if (win(score[turn])) {
            alert(turn + " wins!");
            startNewGame();
        } else if (moves === 9) {
            alert("It's a Tie!");
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X"; 
        }
        if(turn != theTurn){
          computer();
        }
    },
    computer = function () {
       var rand = remaining[Math.floor(Math.random() * remaining.length)];
       if(remaining.indexOf(16)>-1){
       rand = 16;
       center = true;
       }
       else if(vertices.length === 4){
       rand = vertices[Math.floor(Math.random() * vertices.length)];
       }
       else if(vertices.length === 3 && normals.length === 3){
       var arrays = [];
       if(row1.length===2){
       arrays = arrays.concat(row1);
       }
       if(row3.length===2){
       arrays = arrays.concat(row3);
       }
       if(col1.length===2){
       arrays = arrays.concat(col1);
       }
       if(col3.length===2){
       arrays = arrays.concat(col3);
       }
       var sorted_arr = arrays.slice().sort(); 
       var result;
       for (var i = 0; i < arrays.length - 1; i++) {
       if (sorted_arr[i + 1] == sorted_arr[i]) {
        result = sorted_arr[i];
        }
        }
        rand = result;
       }
       else if(vertices.length === 2 && center === false){
       rand = vertices[Math.floor(Math.random() * vertices.length)];
       }
       else if(vertices.length === 2 && center === true){
       rand = normals[Math.floor(Math.random() * normals.length)];
       }
       remaining.some(function (n) {
       var s = false;
       if( win(score["X"]+n) === true){
       rand = n;
       s = true;
       } 
       else if (win(score["O"]+n) === true) {
       rand = n;
       s = true;
       }
       return s;
       });
       document.getElementById(""+rand).click();
    },
    play = function () {
        for (var i = 0; i < 9; i += 1) {
          document.getElementById(""+Math.pow(2, i)).onclick = set; document.getElementById(""+Math.pow(2, i)).appendChild(document.createTextNode(""));
                squares.push(document.getElementById(""+Math.pow(2, i)));
        }
        startNewGame();
    };
    if (typeof window.onload === "function") {
        oldOnLoad = window.onload;
        window.onload = function () {
            oldOnLoad(); 
            play();
        };
    } else {
        window.onload = play;
    }
    $("input[name='category']").click(function() {
    theTurn = this.value;
    startNewGame();
});
}());