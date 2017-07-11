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
		inquirer
			.prompt([
				{
					name: "choice",
					choices: function(answer) {
						for (i in response) {
							console.log(
								`${response[i].product_name}
								Price: ${response[i].price}
								Product ID: ${response[i].item_id}`);
						}
					},
					message: "what would you like to buy? Enter the Product ID to select."
				},
				{
					name: "quantity",
					type: "input",
					message: "How many would you like to buy?"
				}
			])
			.then(function(answer){
				var chosenItem;
				for (i in response) {
					if (response[i].item_id === parseInt(answer.choice)) {
						chosenItem = response[i];
						console.log(chosenItem);
					}
				}
			})
		});
	}
