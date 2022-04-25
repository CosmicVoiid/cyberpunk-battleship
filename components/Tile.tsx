import { useState } from "react";
import styles from "../styles/Tile.module.css";

type Props = {
	status: string;
	index: number;
	hover: boolean;
	player: boolean;
	onClick?: (i: number) => void;
	onMouseOver?: (i: number) => void;
	onMouseOut?: (i: number) => void;
};

const Tile = ({
	status,
	index,
	hover,
	player,
	onClick,
	onMouseOver,
	onMouseOut,
}: Props) => {
	return (
		<div
			className={
				`${styles.tile} ` +
				((hover && `${styles.tileHover}`) ||
					((status === "water" || status == "miss") && `${styles.tileWater}`) ||
					(((player && status === "boat") || status === "hit") &&
						`${styles.tileBoat}`) ||
					(!player && `${styles.tileWater}`))
			}
			onClick={() => {
				if (onClick && !(status === "hit" || status === "miss")) onClick(index);
			}}
			onMouseOver={() => {
				if (onMouseOver && !(status === "hit" || status === "miss"))
					onMouseOver(index);
			}}
			onMouseOut={() => {
				if (onMouseOut) onMouseOut(index);
			}}
		>
			{status === "hit" && <span className={styles.tileHit} />}
			{status === "miss" && <span className={styles.tileMiss} />}
		</div>
	);
};

// if (status === "water")
// 					return {`${styles.tile} ${styles.tileWater}`}
// 				else if (status === "boat" || status === "hover")
// 					return `${styles.tile} ${styles.tileBoat}`

export default Tile;
