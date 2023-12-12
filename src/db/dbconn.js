const { Client } = require("pg");

connectionString = "postgres://postgres:1234@localhost:5432/ecommerce";
const client = new Client({
	connectionString: connectionString,
});

client
	.connect()
	.then(() => {
		console.log("Database connected");
		const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        description TEXT,
         created_at TIMESTAMP DEFAULT NOW()
    )`;
		const createUserTable = `
            CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
)`;
		const createOrdersTrackTable = `
        CREATE TABLE IF NOT EXISTS ordersTrack (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  order_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL
)`;
		const createOrderItemTable = `
        CREATE TABLE IF NOT EXISTS order_item (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES ordersTrack(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL
)`;
		const createShipAddressTable = `
        CREATE TABLE IF NOT EXISTS shipping_addresses (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  recipient_name VARCHAR(100),
  address TEXT,
  city VARCHAR(50),
  postal_code VARCHAR(20),
  country VARCHAR(50)
)`;
		const createRatingTable = `
        CREATE TABLE IF NOT EXISTS product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  user_id INT REFERENCES users(id),
  rating INT NOT NULL,
  review_text TEXT,
  review_date TIMESTAMP DEFAULT NOW()
)`;
        const creatTableQuery=[
            createProductsTable,
            createUserTable,
            createOrdersTrackTable,
            createOrderItemTable,
            createShipAddressTable,
            createRatingTable
        ];
       return Promise.all(creatTableQuery.map(query => client.query(query)))
            .then(() => {
                console.log('All Tables created successfully.');
            })
            .catch((err) => {
                console.log("Error creating tables ", err);
            })
    })
    
	.then(() => {
		console.log('Table created successfully.');
	})
	.catch((err) => {
		console.log("Error connecting to database ", err);
	})
	// .finally(() => {
	// 	client.end();
	// });

module.exports = client;
