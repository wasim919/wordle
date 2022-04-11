import styles from './App.module.scss';
import Item from './components/Item';
import { products } from './datasources/products';

export default function App() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>React Exercise 1</h1>
            {/* <ul>
                <li>Render a list of products from the array above</li>
                <li>
                    when a product is clicked it should `alert()` the title of
                    the product.
                </li>
            </ul> */}
            <div className={styles.products}>
                {products?.map((product) => (
                    <Item key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}
