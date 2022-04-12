import React from 'react';

import styles from './Tiles.module.scss';

function Tiles({ tiles }) {
    return (
        <div className={styles.tileContainer}>
            {tiles?.map((row, rowIndex) => (
                <div className={styles.tileRow} key={rowIndex}>
                    {row?.map((tile, tileIndex) => (
                        <div className={styles.tile} key={tileIndex}>
                            {tile}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Tiles;
