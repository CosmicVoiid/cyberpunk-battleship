import Head from "next/head";
import { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Shipyard from "../components/Shipyard";
import styles from "../styles/SinglePlayer.module.css";

const SinglePlayer = () => {
	const [gameStage, setGameStage] = useState<string>("prep");
	const [turn, setTurn] = useState<string>("player 1");
	const [player1Shot, setPlayer1Shot] = useState<number>(-1);
	const [player2Shot, setPlayer2Shot] = useState<number>(-1);
	const [computerShotLog, setComputerShotLog] = useState<number[]>([]);
	const [winner, setWinner] = useState<string>();

	const handleGameStart = () => {
		setGameStage("start");
	};

	const handleGameEnd = (player: string) => {
		setGameStage("end");
		setWinner(player);
	};

	const handleShot = (index: number) => {
		if (turn === "player 1") {
			setPlayer1Shot(index);
			setTurn("player 2");
			setTimeout(() => {
				setPlayer2Shot(ai());
			}, 500);
		} else if (turn === "player 2") {
			setTimeout(() => {
				setTurn("player 1");
			}, 500);
		}
	};

	const ai = () => {
		let randomShot: number;
		do {
			randomShot = Math.floor(Math.random() * 100);
		} while (checkShotLog(randomShot));
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
							playerName={"Player 2"}
							startGame={handleGameStart}
							endGame={handleGameEnd}
							turn={turn}
							handleShot={handleShot}
							shot={player1Shot}
						/>
					</div>
				)}
			</main>
		</div>
	);
};

export default SinglePlayer;
