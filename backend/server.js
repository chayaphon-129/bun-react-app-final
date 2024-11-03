import express from "express";
import pkg from "pg"; // Using default import
import cors from "cors";
import bcrypt from "bcryptjs"; // Using bcryptjs instead of bcrypt

const { Client } = pkg; // Importing Client from pg

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "bitcoin_prices",
  password: "MY@ym2562",
  port: 5433, // Ensure this port is correct
});

client.connect()
  .then(() => console.log("Connected to the database successfully"))
  .catch(err => console.error("Database connection error:", err));

// Root route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Signup API for new members
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await client.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Server error");
  }
});

// Login API to check if a user is registered
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user: { username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
