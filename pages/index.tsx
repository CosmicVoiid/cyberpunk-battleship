import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Cyberpunk Battleship</title>
				<meta name="Cyberpunk Battleship" content="Cyberpunk Battleship Game" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.header}>
					<h1 className={styles.primaryHeader}>BATTLESHIP</h1>
					<h2 className={styles.secondaryHeader}>Cyberpunk Edition</h2>
				</div>

				<div className={styles.buttonContainer}>
					<Link href="/singleplayer">
						<button className={styles.button}>1 Player</button>
					</Link>
					{/* <button className={styles.button}>2 Player</button>
					<button className={styles.button}>Online</button> */}
				</div>
			</main>
		</div>
	);
};

export default Home;
