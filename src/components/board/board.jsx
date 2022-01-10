import React, { useRef, useState } from "react";
import Tile from "../Tiles/tile";
import "./board.css";

const BOARD = [10, 10];
const boardSize = {
    width: BOARD[0] * 80,
    height: BOARD[1] * 80,
};
const tileSize = {
    width: 80,
    height: 80,
};
class Piece {
    type;
    position = {
        x: 0,
        y: 0,
    };
    player;
    constructor(type, position, player) {
        this.player = player;
        this.position = position;
        this.type = type;
    }
}

const initialStateBoard = []
initialStateBoard.push(new Piece("poison", { x: 2, y: 0 }, 0))
initialStateBoard.push(new Piece("poison", { x: 0, y: 0 }, 0))
export default function ChessBoard() {
    const [activePiece,setActivePiece] = useState(null)
    const [gridX,setGridX] = useState(-1)
    const [gridY,setGridY] = useState(-1)
    const [pieces,setPieces] = useState(initialStateBoard)
    const boardRef = useRef(null);
    function grabPiece(e) {
        let element = e.target;
        board = boardRef.current;
        if (element.id == "piece" && board) {
            setGridX(Math.floor((e.clientX-board.offsetLeft+40)/100))
            setGridY(Math.floor((e.clientY-board.offsetTop+40)/100))
            const position = {
                x: e.clientX - tileSize.width / 2,
                y: e.clientY - tileSize.height / 2,
            };
            element.style.position = "absolute";
            element.style.left = `${position.x}px`;
            element.style.top = `${position.y}px`;
            
            setActivePiece(element);
           
        }
    }

    function movePiece(e) {
        if (activePiece) {
            
            board = boardRef.current;
            console.log(gridX,gridY)
            let x = e.clientX - tileSize.width / 2;
            let y = e.clientY - tileSize.height / 2;
            let minX = board.offsetLeft;
            let maxX = minX + boardSize.width;
            let minY = board.offsetTop;
            let maxY = minY + boardSize.height;
            activePiece.style.position = "absolute";
            activePiece.style.left =
                x < minX
                    ? `${minX}px`
                    : x > maxX - tileSize.width
                        ? `${maxX}px` - tileSize.width
                        : `${x}px`;

            activePiece.style.top =
                y < minY
                    ? `${minY}px`
                    : y > maxY - tileSize.height
                        ? `${maxY}px` - tileSize.height
                        : `${y}px`;
        }
    }
    function dropPiece(e) {
        if (activePiece){
            const x = Math.floor((e.clientX-board.offsetLeft+40)/100)
            const y = Math.floor((e.clientY-board.offsetTop+40)/100)
            
            board = boardRef.current;
            setPieces(n=>{
                let pieces = n.map(p=>{
                    if(p.position.x == gridX && p.position.y == gridY){
                        console.log("ind")
                        p.position = {x,y}
                    }
                    return p;
                })
                return pieces
            })
            setActivePiece(null);
        };
        
    }
    let board = [];
    for (let i = 0;i < BOARD[0];i++) {
        for (let j = 0;j < BOARD[1];j++) {
            let piece = undefined;
            pieces.forEach((p) => {
                if (p.position.x == j && p.position.y == i) {
                    piece = p;
                }
            });
            board.push(
                <Tile
                    key={`${i},${j}`}
                    tileSize={tileSize}
                    number={i + j}
                    piece={piece}
                />
            );
        }
    }
    return (
        <div
            onMouseDown={(e) => grabPiece(e)}
            onMouseMove={(e) => movePiece(e)}
            onMouseUp={(e) => dropPiece(e)}
            id="board"
            style={{ width: boardSize.width + "px", height: boardSize.height + "px" }}
            ref={boardRef}
        >
            {board}
        </div>
    );
}
