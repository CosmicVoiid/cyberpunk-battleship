import { useState } from 'react';
import styles from '../styles/Tile.module.css'

type Props = {
    stat?: string
}

const Tile = ({stat}: Props) => {
    const [tileStatus, setTileStatus] = useState(stat)

    return <div className={styles.tile}>

    </div>
}

export default Tile;