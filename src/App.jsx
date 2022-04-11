const products = [
	{
		id: 1,
		title: 'iPhone 9',
		description: 'An apple mobile which is nothing like apple',
		thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg'
	},
	{
		id: 2,
		title: 'iPhone X',
		description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
		thumbnail: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg'
	},
	{
		id: 3,
		title: 'Huawei P30',
		description:
			'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
		thumbnail: 'https://dummyjson.com/image/i/products/5/thumbnail.jpg'
	},
	{
		id: 4,
		title: 'MacBook Pro',
		description: 'MacBook Pro 2021 with mini-LED display may launch between September, November',
		thumbnail: 'https://dummyjson.com/image/i/products/6/thumbnail.png'
	}
];

export default function App() {
	return (
		<div>
			<h1>React Exercise 1</h1>
			<ul>
				<li>Render a list of products from the array above</li>
				<li>when a product is clicked it should `alert()` the title of the product.</li>
			</ul>
		</div>
	);
}
