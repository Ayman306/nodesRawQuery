const bcrypt = require("bcrypt")
const client = require("../db/dbconn");
const saltRounds = 10;
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body
        const hashPassword = password;
        const insertQuery = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3,$4)
      RETURNING *;`;
        bcrypt.hash(hashPassword, saltRounds, async (err, hash) => {
            if (err) {
                res.json("Error in crypting")
            } else {
                const values =[username,email,hash,role]
                const result = await client.query(insertQuery, values)
                if (result && result.rows.length > 0) {
                    res.json("User created")
                } else {
                    res.json("Error creating user")
                }
            }
        })
        console.log(req.body);
    } catch (err) {
        res.json('ERROR', err.message);
        
    }
} 
const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            console.log(username, password);
    const query = 'SELECT * FROM users WHERE username = $1';
            const user = await client.query(query ,[username]);
           if (user.rows.length > 0) {
  const result = comparePassword(password, user.rows[0], res);
  console.log(result);
} else {
  res.json("Invalid username");
}

        } else {
            res.json("Missing values")
        }
        
  } catch (err) {
  res.status(500).json({ error: "An error occurred", err: err });
}

}
 function comparePassword(password, user, res) {
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      res.status(500).json({ error: "An error occurred", err: err });
    } else if (result) {
      // Passwords match, user is authenticated
      res.json({ message: "Welcome user", data: user });
    } else {
      // Passwords do not match, authentication failed
      res.json("Invalid password");
    }
  });
}

const profile = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}
const updateProfile = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}
const logout = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}


// Admin acces only 
const userList = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}
module.exports = {
    registerUser,
    login,
    profile,
    updateProfile,
    logout,
    userList
}