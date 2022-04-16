import { useState } from "react";
import styles from "../styles/Tile.module.css";

type Props = {
	status: string;
	index: number;
	hover: boolean;
	onClick: (i: number) => void;
	onMouseOver: (i: number) => void;
	onMouseOut: (i: number) => void;
};

const Tile = ({
	status,
	index,
	hover,
	onClick,
	onMouseOver,
	onMouseOut,
}: Props) => {
	return (
		<div
			className={
				`${styles.tile} ` +
				((hover && `${styles.tileHover}`) ||
					(status === "water" && `${styles.tileWater}`) ||
					(status === "boat" && `${styles.tileBoat}`))
			}
			onClick={() => onClick(index)}
			onMouseOver={() => onMouseOver(index)}
			onMouseOut={() => onMouseOut(index)}
		></div>
	);
};

// if (status === "water")
// 					return {`${styles.tile} ${styles.tileWater}`}
// 				else if (status === "boat" || status === "hover")
// 					return `${styles.tile} ${styles.tileBoat}`

export default Tile;
