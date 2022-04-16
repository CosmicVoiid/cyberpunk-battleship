import { useState, useEffect } from "react";
import styles from "../styles/Grid.module.css";
import Tile from "./Tile";

type tileArray = {
	index: number;
	status: string;
	hover: boolean;
	boatName?: string;
}[];

const Grid = () => {
	const [tileArray, setTileArray] = useState<tileArray>([]);
	const [gameStage, setGameStage] = useState("prep");
	const [direction, setDirection] = useState<string>("x");
	const [boat, setBoat] = useState<number>(0);

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

	const boatArray = [
		{ name: "Patrol Boat", size: 2 },
		{ name: "Submarine", size: 3 },
		{ name: "Destroyer", size: 3 },
		{ name: "Battleship", size: 4 },
		{ name: "Carrier", size: 5 },
	];

	const hoverHighlight = (boatIndex: number) => {
		let updatedTileArray = [...tileArray];
		const boatSize = boatArray[boat].size;
		let xBreak = checkPlacement("x", boatIndex, boatSize);
		let yBreak = checkPlacement("y", boatIndex, boatSize);

		if (direction === "x" && !xBreak) {
			for (let i = 0; i < boatSize; i++) {
				updatedTileArray[boatIndex + i].hover = true;
			}
		} else if (direction === "y" && !yBreak) {
			for (let i = 0; i < boatSize; i++) {
				updatedTileArray[boatIndex + i * 10].hover = true;
			}
		}

		setTileArray(updatedTileArray);
	};

	const highlightRemove = (boatIndex: number) => {
		let updatedTileArray = [...tileArray];
		const boatSize = boatArray[boat].size;
		let xBreak = checkPlacement("x", boatIndex, boatSize);
		let yBreak = checkPlacement("y", boatIndex, boatSize);

		if (direction === "x" && !xBreak) {
			for (let i = 0; i < boatSize; i++) {
				if (tileArray[boatIndex + i].hover === true) {
					updatedTileArray[boatIndex + i].hover = false;
				}
			}
		} else if (direction === "y" && !yBreak) {
			for (let i = 0; i < boatSize; i++) {
				updatedTileArray[boatIndex + i * 10].hover = false;
			}
		}

		setTileArray(updatedTileArray);
	};

	const placeShip = (boatIndex: number) => {
		let updatedTileArray = [...tileArray];
		const boatSize = boatArray[boat].size;
		const boatName = boatArray[boat].name;
		let xBreak = checkPlacement("x", boatIndex, boatSize);
		let yBreak = checkPlacement("y", boatIndex, boatSize);

		if (direction === "x" && !xBreak) {
			for (let i = 0; i < boatSize; i++) {
				updatedTileArray[boatIndex + i].status = "boat";
				updatedTileArray[boatIndex + i].boatName = boatName;
				updatedTileArray[boatIndex + i].hover = false;
			}

			if (boat < boatArray.length - 1) {
				let updatedIndex = boat + 1;
				setBoat(updatedIndex);
			}
		} else if (direction === "y" && !yBreak) {
			for (let i = 0; i < boatSize; i++) {
				updatedTileArray[boatIndex + i * 10].status = "boat";
				updatedTileArray[boatIndex + i * 10].boatName = boatName;
				updatedTileArray[boatIndex + i * 10].hover = false;
			}

			if (boat < boatArray.length - 1) {
				let updatedIndex = boat + 1;
				setBoat(updatedIndex);
			}
		}

		console.log(updatedTileArray);
		setTileArray(updatedTileArray);
	};

	const checkPlacement = (
		axis: string,
		boatIndex: number,
		boatSize: number
	) => {
		if (axis === "x") {
			for (let i = 0; i < boatSize; i++) {
				if (
					((boatIndex + 10) % 10) + boatSize > 10 ||
					tileArray[boatIndex + i].status === "boat"
				) {
					return true;
				}
			}
		}

		if (axis === "y") {
			for (let i = 0; i < boatSize; i++) {
				if (
					boatIndex + (boatSize - 1) * 10 > 99 ||
					tileArray[boatIndex + i * 10].status === "boat"
				) {
					return true;
				}
			}
		}
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
