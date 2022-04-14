import styles from "../styles/Shipyard.module.css";

const Shipyard = () => {
	const dragHandler = (e: any) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	return (
		<div className={styles.shipyardContainer}>
			<div className={styles.boatContainer}>
				<h2 className={styles.boatHeader}>Patrol Boat</h2>
				<span
					className={`${styles.patrolBoatContainer} ${styles.boat}`}
					draggable="true"
				/>
			</div>

			<div className={styles.boatContainer}>
				<h2 className={styles.boatHeader}>Submarine</h2>
				<span
					className={`${styles.submarineContainer} ${styles.boat}`}
					draggable="true"
				/>
			</div>

			<div className={styles.boatContainer}>
				<h2 className={styles.boatHeader}>Destroyer</h2>
				<span
					className={`${styles.destroyerContainer} ${styles.boat}`}
					draggable="true"
					onDragStart={(e) => dragHandler(e)}
				/>
			</div>

			<div className={styles.boatContainer}>
				<h2 className={styles.boatHeader}>Battleship</h2>
				<span
					className={`${styles.battleshipContainer} ${styles.boat}`}
					draggable="true"
				/>
			</div>

			<div className={styles.boatContainer}>
				<h2 className={styles.boatHeader}>Carrier</h2>
				<span
					className={`${styles.carrierContainer} ${styles.boat}`}
					draggable="true"
				/>
			</div>
		</div>
	);
};

export default Shipyard;
