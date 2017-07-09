const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "10053VUa!",
	database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
	storeDisplay();
})

const storeDisplay = () => {
	connection.query("SELECT * FROM products", function(err, response) {
		if (err) throw err;
		console.log(`Welcome to Bamazon! What would you like to buy?\n`);
		for (x in response) {
			console.log(
				`${response[x].product_name}
				Price: ${response[x].price}
				Product ID: ${response[x].item_id}`);
		}
	})
}