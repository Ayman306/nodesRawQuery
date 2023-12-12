const client = require("../db/dbconn");
 async function searchProduct  (search,res) {
	try {
		const result = await client.query(
			`SELECT * FROM products where name like '%${search}%';`
		);
		if (result.rows.length > 0) {
			 res.json(result.rows);
		} else {
			res.json("Not found").status(401);
		}
	} catch (err) {
        console.log(err, "error in searching");
        res.json('No product found')
	}
 };

const getAll = async (req, res) => {
    try {
        const search = req.query['search']
        console.log(req.query);
        if (search) {
            await searchProduct(search, res)
        } else {
            const result = await client.query("SELECT * FROM products");
            if (result && result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json({message:"No products"})
            }
            console.log(res);
        }
	} catch (err) {
		console.error('Error fetching data from the "product" table:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const getProductById = async (req, res) => {
	try {
		const id = req.params["id"];
		if (!isNaN(id)) {
			const result = await client.query(
				`SELECT * FROM products WHERE id = ${id}`
            );
            if (result && result.rows.length > 0) {
                
                res.json(result.rows);
            } else {
                res.json({message:"Product not found"})
            }
		} else {
			return res.sendStatus(422);
		}
	} catch (err) {
		console.log("cannot find the product", err);
	}
};
const createProduct = async (req, res) => {
    try {
      console.log(req.body,"llllllllllllllllllllllll");
    const { name, price, description } = req.body;

    // Use a parameterized query to insert data
    const insertQuery = `
      INSERT INTO products (name, price, description)
      VALUES ($1, $2, $3)
      RETURNING *;`;

    const values = [name, price, description];
    console.log(name);
    const result = await client.query(insertQuery, values);

    if (result && result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.json("Cannot insert values");
    }
  } catch (err) {
    console.error("Error creating new product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateProduct = async (req, res) => {
	try {
		const id = req.params["id"];
		const { name, price, description } = req.body;
		if (!isNaN(id)) {
			const queryText =await client.query(`UPDATE products SET name='${name}', price=${price} , description='${description}' where id= '${id}'`);
			res.json({ message: "Product updated" });
		} else {
			return res.sendStatus(422).end();
		}
	} catch (err) {
		console.log("Error updating user", err);
	}
};
const deleteProduct = async (req, res) => {
	try {
		const id = req.params["id"];
		const queryText =await client.query( `DELETE from products WHERE id= '${id}'`);
		if (queryText) {
			res.json({ message: `Product deleted ${id}` });
		} else {
			return res.sendStatus(503);
		}
	} catch (err) {
		console.log(`Error deleting ${id}`, err);
	}
};
module.exports = {
	getAll,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
