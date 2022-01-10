import Piece from '../Pieces/piece'
import './tile.css'


export default function Tile({ number, piece }) {
    if (number % 2 === 0) {
        return <div id="tile" className="even" style={{ width: 80 + 'px', height: 80 + 'px' }} ><Piece type={piece?.type} /></div>
    } else {
        return <div id="tile" className="odd" style={{ width: 80 + 'px', height: 80 + 'px' }} ><Piece type={piece?.type} /></div>
    }

}