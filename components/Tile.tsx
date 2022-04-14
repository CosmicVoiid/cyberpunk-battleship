import { useState } from "react";
import styles from "../styles/Tile.module.css";

type Props = {
	status: string;
	index: number;
	onClick: (i: number) => void;
};

const Tile = ({ status, index, onClick }: Props) => {
	const [tileStatus, setTileStatus] = useState(status);
	const [tileIndex, setTileIndex] = useState<number>(index);

	return (
		<div
			className={
				status === "water"
					? `${styles.tile} ${styles.tileWater}`
					: `${styles.tile} ${styles.tileBoat}`
			}
			onClick={() => onClick(tileIndex)}
		></div>
	);
};

export default Tile;
