import Head from "next/head";
import { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Shipyard from "../components/Shipyard";
import Link from "next/link";
import styles from "../styles/SinglePlayer.module.css";

const SinglePlayer = () => {
	const [gameStage, setGameStage] = useState<string>("prep");
	const [turn, setTurn] = useState<string>("Player 1");
	const [player1Shot, setPlayer1Shot] = useState<number>(-1);
	const [player2Shot, setPlayer2Shot] = useState<number>(-1);
	const [computerShotLog, setComputerShotLog] = useState<number[]>([]);
	const [winner, setWinner] = useState<string>();
	const [reset, setReset] = useState<number>(0);

	const handleGameStart = () => {
		setGameStage("start");
	};

	const handleGameEnd = (player: string) => {
		setGameStage("end");
		setWinner(player);
	};

	const handleShot = (index: number) => {
		if (turn === "Player 1") {
			setPlayer1Shot(index);
			setTurn("Computer");
			setTimeout(() => {
				setPlayer2Shot(ai());
			}, 500);
		} else if (turn === "Computer") {
			setTimeout(() => {
				setTurn("Player 1");
			}, 500);
		}
	};

	const ai = () => {
		let randomShot: number;
		do {
			randomShot = Math.floor(Math.random() * 100);
		} while (checkShotLog(randomShot));
		let shotLogCopy = [...computerShotLog];
		shotLogCopy.push(randomShot);
		setComputerShotLog(shotLogCopy);
		return randomShot;
	};

	const checkShotLog = (index: number) => {
		let match = false;
		computerShotLog.map((shot) => {
			if (shot === index) {
				match = true;
			}
		});

		return match;
	};

	const resetGame = () => {
		setGameStage("prep");
		setTurn("Player 1");
		setPlayer1Shot(-1);
		setPlayer2Shot(-1);
		setComputerShotLog([]);
		setWinner("");
		let number = reset;
		setReset(++number);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Cyberpunk Battleship</title>
				<meta name="Cyberpunk Battleship" content="Cyberpunk Battleship Game" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{gameStage === "prep" && (
					<h1 className={styles.header}>Organize your fleet!</h1>
				)}
				{gameStage === "start" && (
					<h1 className={styles.header}>{`${turn}'s turn!`}</h1>
				)}
				{gameStage === "end" && (
					<h1 className={styles.header}>{`${winner} wins!`}</h1>
				)}

				<Grid
					key={reset}
					player={true}
					playerName={"Player 1"}
					startGame={handleGameStart}
					endGame={handleGameEnd}
					turn={turn}
					handleShot={handleShot}
					shot={player2Shot}
				/>

				{/* <Shipyard /> */}
				{(gameStage === "start" || gameStage === "end") && (
					<div>
						<span className={styles.divider} />
						<Grid
							player={false}
							playerName={"Computer"}
							startGame={handleGameStart}
							endGame={handleGameEnd}
							turn={turn}
							handleShot={handleShot}
							shot={player1Shot}
						/>
					</div>
				)}
				{gameStage === "end" && (
					<button onClick={resetGame} className={styles.btn}>
						Play Again
					</button>
				)}
			</main>
		</div>
	);
};

export default SinglePlayer;
