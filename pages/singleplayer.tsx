import Head from "next/head";
import { useState } from "react";
import Grid from "../components/Grid";
import Shipyard from "../components/Shipyard";
import styles from "../styles/SinglePlayer.module.css";

const SinglePlayer = () => {
	const [gameStage, setGameStage] = useState<string>("prep");

	const handleGameStart = () => {
		setGameStage("start");
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
				<Grid player={true} startGame={handleGameStart} />
				{/* <Shipyard /> */}
				{gameStage === "start" && (
					<Grid player={false} startGame={handleGameStart} />
				)}
			</main>
		</div>
	);
};

export default SinglePlayer;
