import { useState, useEffect } from "react";
import styles from "../styles/Grid.module.css";
import Tile from "./Tile";

type tileArray = {
	index: number;
	status: string;
	hover: boolean;
}[];

const Grid = () => {
	const [tileArray, setTileArray] = useState<tileArray>([]);
	const [gameStage, setGameStage] = useState("prep");
	const [direction, setDirection] = useState<string>("x");

	const GRID_SQUARES = 100;
	const NUM_COORD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	const ALPHA_COORD = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

	const initilizeGrid = () => {
		const initialArray = [];
		for (let i = 0; i < GRID_SQUARES; i++) {
			initialArray.push({ index: i, status: "water", hover: false });
		}
		console.log(initialArray);
		setTileArray(initialArray);
	};

	useEffect(() => {
		initilizeGrid();
	}, []);

	const dropHandler = (e: any) => {
		e.preventDefault();
	};

	const changeDirection = (e: any) => {
		e.preventDefault();
		direction === "x" ? setDirection("y") : setDirection("x");
	};

	// const placeShips = (shipsArray: [{name: string, size: number, direction: string}]) => {
	// 	for (let i = 0; i < shipsArray.length; i++) {

	// 	}
	// }
	const BOATSIZE = 4;

	const hoverHighlight = (boatIndex: number) => {
		let updatedTileArray = [...tileArray];
		if (
			direction === "x" &&
			((boatIndex + 10) % 10) + BOATSIZE <= 10 &&
			tileArray[boatIndex + BOATSIZE].status !== "boat" &&
			tileArray[boatIndex].status !== "boat"
		) {
			for (let i = 0; i < BOATSIZE; i++) {
				updatedTileArray[boatIndex + i].hover = true;
			}
		} else if (
			direction === "y" &&
			boatIndex + (BOATSIZE - 1) * 10 <= 99 &&
			tileArray[boatIndex + (BOATSIZE - 1) * 10].status !== "boat" &&
			tileArray[boatIndex].status !== "boat"
		) {
			for (let i = 0; i < BOATSIZE; i++) {
				updatedTileArray[boatIndex + i * 10].hover = true;
			}
		}

		setTileArray(updatedTileArray);
	};

	const highlightRemove = (boatIndex: number) => {
		let updatedTileArray = [...tileArray];
		if (
			direction === "x" &&
			((boatIndex + 10) % 10) + BOATSIZE <= 10 &&
			tileArray[boatIndex + BOATSIZE].status !== "boat" &&
			tileArray[boatIndex].status !== "boat"
		) {
			for (let i = 0; i < BOATSIZE; i++) {
				updatedTileArray[boatIndex + i].hover = false;
			}
		} else if (
			direction === "y" &&
			boatIndex + (BOATSIZE - 1) * 10 <= 99 &&
			tileArray[boatIndex + (BOATSIZE - 1) * 10].status !== "boat" &&
			tileArray[boatIndex].status !== "boat"
		) {
			for (let i = 0; i < BOATSIZE; i++) {
				updatedTileArray[boatIndex + i * 10].hover = false;
			}
		}

		setTileArray(updatedTileArray);
	};

	const placeShip = (boatIndex: number) => {
		let updatedTileArray = [...tileArray];
		if (
			direction === "x" &&
			((boatIndex + 10) % 10) + BOATSIZE <= 10 &&
			tileArray[boatIndex + BOATSIZE].status !== "boat" &&
			tileArray[boatIndex].status !== "boat"
		) {
			for (let i = 0; i < BOATSIZE; i++) {
				updatedTileArray[boatIndex + i].status = "boat";
				updatedTileArray[boatIndex + i].hover = false;
			}
		} else if (
			direction === "y" &&
			boatIndex + (BOATSIZE - 1) * 10 <= 99 &&
			tileArray[boatIndex + (BOATSIZE - 1) * 10].status !== "boat" &&
			tileArray[boatIndex].status !== "boat"
		) {
			for (let i = 0; i < BOATSIZE; i++) {
				updatedTileArray[boatIndex + i * 10].status = "boat";
				updatedTileArray[boatIndex + i * 10].hover = false;
			}
		}

		console.log(updatedTileArray);
		setTileArray(updatedTileArray);
	};

	return (
		<div className={styles.gridComponent}>
			<button onClick={changeDirection} className={styles.btn}>
				Change Direction
			</button>
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
							key={index}
							index={index}
							status={tile.status}
							hover={tile.hover}
							onClick={(index: number) => placeShip(index)}
							onMouseOver={(index: number) => hoverHighlight(index)}
							onMouseOut={(index: number) => highlightRemove(index)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Grid;
