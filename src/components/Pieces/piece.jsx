import Poison from "./poison";

import './piece.css'


export default function Piece({type}){
    switch (type) {
        case "poison":
            return <Poison/>
        /*case "circle":
            return <Circle />
        case "crown":
            return <Crown />
        case "eye":
            return <Eye />
        case "square":
            return <Square />
        case "x":
            return <X />*/
        default:
            return (null)
    }
}