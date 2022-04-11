import React from 'react';

import styles from './Item.module.scss';

function Item({ title, description, thumbnail }) {
    return (
        <article className={styles.card}>
            <h2 className={styles.card__title}>{title}</h2>
            <img
                className={styles.card__image}
                src={thumbnail}
                alt="thumbnail"
            />
            a<p className={styles.card__description}>{description}</p>
        </article>
    );
}

export default Item;
