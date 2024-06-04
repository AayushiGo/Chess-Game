const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");
const waiting = document.querySelector(".waiting-message");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";
  board.forEach((row, rowindex) => {
    row.forEach((square, squareindex) => {
      const squareElement = document.createElement("div");
      squareElement.classList.add(
        "square",
        (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
      );

      squareElement.dataset.row = rowindex;
      squareElement.dataset.col = squareindex;

      if (square) {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add(
          "piece",
          square.color === "w" ? "white" : "black"
        );

        pieceElement.innerText = getPieceUnicode(square);
        pieceElement.draggable = playerRole === square.color;

        pieceElement.addEventListener("dragstart", (e) => {
          if (pieceElement.draggable) {
            draggedPiece = pieceElement;
            sourceSquare = { row: rowindex, col: squareindex };
            e.dataTransfer.setData("text/plain", "");
            highlightLegalMoves(sourceSquare);
          }
        });

        pieceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
          clearHighlighting();
        });

        squareElement.appendChild(pieceElement);
      }

      squareElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      squareElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSquare = {
            row: parseInt(squareElement.dataset.row),
            col: parseInt(squareElement.dataset.col),
          };

          handleMove(sourceSquare, targetSquare);
        }
      });

      boardElement.appendChild(squareElement);
    });
  });
};

const handleMove = (source, target) => {
  const move = {
    from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: "q",
  };

  console.log("Attempting move:", move);

  const moveResult = chess.move(move);

  if (moveResult) {
    console.log("Move successful:", moveResult);
    socket.emit("move", move);
    renderBoard();
  } else {
    console.log("Invalid move:", move);
  }
};

const highlightLegalMoves = (source) => {
  const sourceSquare = `${String.fromCharCode(97 + source.col)}${
    8 - source.row
  }`;
  const legalMoves = chess.moves({ square: sourceSquare, verbose: true });

  legalMoves.forEach((move) => {
    const targetSquare = document.querySelector(
      `.square[data-row='${8 - move.to[1]}'][data-col='${
        move.to.charCodeAt(0) - 97
      }']`
    );
    if (targetSquare) {
      targetSquare.classList.add("highlight");
    }
  });
};

const clearHighlighting = () => {
  const highlightedSquares = document.querySelectorAll(".highlight");
  highlightedSquares.forEach((square) => {
    square.classList.remove("highlight");
  });
};

const getPieceUnicode = (piece) => {
  const unicodePieces = {
    p: "♙",
    r: "♖",
    n: "♘",
    b: "♗",
    q: "♕",
    k: "♔",
    P: "♟",
    R: "♜",
    N: "♞",
    B: "♝",
    Q: "♛",
    K: "♚",
  };

  return unicodePieces[piece.type] || "";
};

socket.on("playerRole", function (role) {
  playerRole = role;
  renderBoard();
});

socket.on("spectatorRole", function () {
  playerRole = null;
  renderBoard();
});

socket.on("boardState", function (fen) {
  chess.load(fen);
  renderBoard();
});

socket.on("move", function (move) {
  chess.move(move);
  renderBoard();
});

// Initial board rendering
renderBoard();
