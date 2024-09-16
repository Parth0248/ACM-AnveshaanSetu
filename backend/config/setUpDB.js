const mysql = require('mysql2/promise');

const connectToDatabase = async () => {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      socketPath: "/tmp/mysql.sock",
      password: "#Nipun100",
      database: "AnveshanSetu",
    });
    
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

module.exports = connectToDatabase;