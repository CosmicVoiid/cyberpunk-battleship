import { useState, useEffect } from 'react';
import styles from '../styles/Grid.module.css'
import Tile from './Tile';

const Grid = () => {
    const [tileArray, setTileArray] = useState([{status: "null"}]);

    const GRID_SQUARES = 110;
    const NUM_COORD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const ALPHA_COORD = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const initilizeGrid = () => {
        const initialArray = [];
        for (let i = 0; i < GRID_SQUARES; i++) {
            initialArray.push({status: "water"});
        }
        setTileArray(initialArray);
    }

    useEffect(() => {
        initilizeGrid();
    }, [])

    return ( 
    <div className={styles.gridContainer}>
        {ALPHA_COORD.map((alpha) => {
            return (<div className={styles.alphabet} key={alpha}>{alpha}</div>)
        })}
     
        {tileArray.map((tile, index) => {
            if (index % 11 === 0 || index === 0){
                return <div className={styles.number} key={index}>{Math.floor(index/10) + 1}</div>
            } else {
                return <Tile key={index}/>
            }
        })}
    </div> );
}

export default Grid;