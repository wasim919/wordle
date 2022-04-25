import React from 'react';
import styles from './Tile.module.scss';

function Tile({ rowIndex, tileIndex, tile }) {
    return (
        <div
            id={`${rowIndex}${tileIndex}`}
            className={styles.tile}
            key={tileIndex}
        >
            {tile}
        </div>
    );
}

export default Tile;
