let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enabledBoxes();
  msgContainer.classList.add("hide");
  enabledHover();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      //playerO
      box.innerText = "0";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    
    if (count === 9 && !isWinner) {
        gameDraw();
      }
  });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    disabledHover();
  };

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};


// Add hover effect
const enabledHover = () => {
    for (let box of boxes) {
      box.classList.remove("disabled-hover");
    }
  };
  
  // Remove hover effect
  const disabledHover = () => {
    for (let box of boxes) {
      box.classList.add("disabled-hover");
    }
  };
  
  // Example usage
//   const boxes = document.querySelectorAll('.box');
  
//   // Enable hover on button click
//   document.getElementsByClassName('disabled-hover').addEventListener('click', enabledHover);
  
//   // Disable hover on button click
//   document.getElementsByClassName('disabled-hover').addEventListener('click', disabledHover);
  



const showWinner = (winner) => {
  msg.innerText = `congratulation, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
  disabledHover();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner", pos1val);
        showWinner(pos1val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
