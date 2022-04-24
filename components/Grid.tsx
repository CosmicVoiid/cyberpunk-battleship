import { useState, useEffect } from "react";
import styles from "../styles/Grid.module.css";
import Tile from "./Tile";

type Props = {
	player: boolean;
	startGame: () => void;
};

type tileArray = {
	index: number;
	status: string;
	hover: boolean;
	boatName?: string;
}[];

const Grid = ({ player, startGame }: Props) => {
	const [tileArray, setTileArray] = useState<tileArray>([]);
	const [gameStage, setGameStage] = useState<string>("prep");
	const [direction, setDirection] = useState<string>("x");
	const [randomize, setRandomize] = useState<boolean>(false);
	const [displayButtons, setDisplayButtons] = useState<boolean>(true);
	const [boat, setBoat] = useState<number>(0);

	const GRID_SQUARES = 100;
	const NUM_COORD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	const ALPHA_COORD = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	const boatArray = [
		{ name: "Patrol Boat", size: 2 },
		{ name: "Submarine", size: 3 },
		{ name: "Destroyer", size: 3 },
		{ name: "Battleship", size: 4 },
		{ name: "Carrier", size: 5 },
	];

	const initilizeGrid = async () => {
		const initialArray: tileArray = [];
		for (let i = 0; i < GRID_SQUARES; i++) {
			initialArray.push({ index: i, status: "water", hover: false });
		}
		setTileArray(initialArray);
		setGameStage("prep");
		setBoat(0);
	};

	useEffect(() => {
		initilizeGrid();
		if (!player) {
			setRandomize(true);
		}
	}, []);

	useEffect(() => {
		if (tileArray.length !== 0 && randomize) {
			aiShipPlacement();
			setRandomize(false);
			setGameStage("start");
		}
	}, [randomize]);

	const dropHandler = (e: any) => {
		e.preventDefault();
	};

	const aiShipPlacement = () => {
		let direction: number;
		let index: number;
		let updatedTileArray: tileArray = [...tileArray];
		for (let i = 0; i < boatArray.length; i++) {
			// direction = Math.floor(Math.random() * 2);
			direction = Math.floor(Math.random() * 2);
			if (direction === 0) {
				do {
					index =
						Math.floor(Math.random() * (10 - boatArray[i].size)) +
						10 * Math.floor(Math.random() * 10);
				} while (checkPlacement("x", index, boatArray[i].size));

				for (let j = 0; j < boatArray[i].size; j++) {
					updatedTileArray[index + j].boatName = boatArray[i].name;
					updatedTileArray[index + j].status = "boat";
				}
			} else if (direction === 1) {
				do {
					index =
						10 * Math.floor(Math.random() * (10 - boatArray[i].size)) +
						Math.floor(Math.random() * 10);
				} while (checkPlacement("y", index, boatArray[i].size));

				for (let j = 0; j < boatArray[i].size; j++) {
					updatedTileArray[index + j * 10].boatName = boatArray[i].name;
					updatedTileArray[index + j * 10].status = "boat";
				}
			}
		}

		setTileArray(updatedTileArray);
		return;
	};

	const changeDirection = (e: any) => {
		e.preventDefault();
		direction === "x" ? setDirection("y") : setDirection("x");
	};

	const randomizeShips = () => {
		initilizeGrid();
		setRandomize(true);
	};

	const clearShips = () => {
		initilizeGrid();
	};

	// const placeShips = (shipsArray: [{name: string, size: number, direction: string}]) => {
	// 	for (let i = 0; i < shipsArray.length; i++) {

	// 	}
	// }

	const hoverHighlight = (boatIndex: number) => {
		if (gameStage !== "prep" || boat === boatArray.length || !player) {
			return;
		}
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
		if (gameStage !== "prep" || boat === boatArray.length || !player) {
			return;
		}
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
		if (gameStage !== "prep" || !player) {
			return;
		}
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

			if (boat < boatArray.length) {
				let updatedIndex = boat + 1;
				setBoat(updatedIndex);
			}
		} else if (direction === "y" && !yBreak) {
			for (let i = 0; i < boatSize; i++) {
				updatedTileArray[boatIndex + i * 10].status = "boat";
				updatedTileArray[boatIndex + i * 10].boatName = boatName;
				updatedTileArray[boatIndex + i * 10].hover = false;
			}

			if (boat < boatArray.length) {
				let updatedIndex = boat + 1;
				setBoat(updatedIndex);
			}
		}

		if (boat === boatArray.length - 1) {
			console.log("yo");
			setGameStage("start");
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

		return false;
	};

	const gridStart = () => {
		setDisplayButtons(false);
		startGame();
	};

	return (
		<div className={styles.gridComponent}>
			{player && displayButtons && (
				<div className={styles.buttonContainer}>
					<button onClick={changeDirection} className={styles.btn}>
						Change Direction
					</button>
					<button onClick={randomizeShips} className={styles.btn}>
						Randomize
					</button>
					<button onClick={clearShips} className={styles.btn}>
						Clear
					</button>
				</div>
			)}
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
			{gameStage === "start" && player && displayButtons && (
				<button onClick={gridStart} className={styles.btn}>
					Start
				</button>
			)}
		</div>
	);
};

export default Grid;
