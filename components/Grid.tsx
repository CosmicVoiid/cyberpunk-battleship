import { useState, useEffect } from "react";
import styles from "../styles/Grid.module.css";
import Tile from "./Tile";

const Grid = () => {
	const [tileArray, setTileArray] = useState([{ index: -1, status: "null" }]);
	const [gameStage, setGameStage] = useState("prep");

	const GRID_SQUARES = 100;
	const NUM_COORD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	const ALPHA_COORD = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	const initilizeGrid = () => {
		const initialArray = [];
		for (let i = 0; i < GRID_SQUARES; i++) {
			initialArray.push({ index: i, status: "water" });
		}
		setTileArray(initialArray);
	};

	useEffect(() => {
		initilizeGrid();
	}, []);

	const dropHandler = (e: any) => {
		e.preventDefault();
	};

	// const placeShips = (shipsArray: [{name: string, size: number, direction: string}]) => {
	// 	for (let i = 0; i < shipsArray.length; i++) {

	// 	}
	// }

	const placeShip = (boatIndex: number) => {
		console.log(boatIndex);
		let updatedTileArray = [...tileArray];
		for (let i = 0; i < 2; i++) {
			updatedTileArray[boatIndex + i] = {
				index: boatIndex + i,
				status: "boat",
			};
			console.log(i);
		}
		console.log(updatedTileArray);
		setTileArray(updatedTileArray);
	};

	return (
		<div className={styles.gridContainer}>
			{ALPHA_COORD.map((alpha) => {
				return (
					<div className={styles.alphabet} key={alpha}>
						{alpha}
					</div>
				);
			})}
			{NUM_COORD.map((num) => {
				return (
					<div
						className={styles.number}
						key={num}
						style={{ gridRowStart: `${parseInt(num) + 1}` }}
					>
						{num}
					</div>
				);
			})}

			{tileArray.map((tile, index) => {
				return (
					<Tile
						onClick={(index: number) => placeShip(index)}
						key={index}
						index={index}
						status={tile.status}
					/>
				);
			})}
		</div>
	);
};

export default Grid;
