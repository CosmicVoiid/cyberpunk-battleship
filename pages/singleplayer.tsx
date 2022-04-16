import Head from "next/head";
import Grid from "../components/Grid";
import Shipyard from "../components/Shipyard";
import styles from "../styles/SinglePlayer.module.css";

const SinglePlayer = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Cyberpunk Battleship</title>
				<meta name="Cyberpunk Battleship" content="Cyberpunk Battleship Game" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.header}>Organize your fleet!</h1>
				<Grid />
				{/* <Shipyard /> */}
			</main>
		</div>
	);
};

export default SinglePlayer;
