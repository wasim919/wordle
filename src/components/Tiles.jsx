import React from 'react';
import Tile from './Tile';

import styles from './Tiles.module.scss';

function Tiles({ tiles }) {
    return (
        <div id="tileContainer" className={styles.tileContainer}>
            {tiles?.map((row, rowIndex) => (
                <div className={styles.tileRow} key={rowIndex}>
                    {row?.map((tile, tileIndex) => (
                        <Tile
                            key={tileIndex}
                            rowIndex={rowIndex}
                            tileIndex={tileIndex}
                            tile={tile}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Tiles;
