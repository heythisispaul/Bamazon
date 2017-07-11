const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "100VUa!",
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
								Price: $${response[i].price}
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
					}
				}
				if (chosenItem.stock_quantity < answer.quantity) {
					console.log("Sorry, not enough in stock, try ordering fewer!");
					storeDisplay();
				} else if (chosenItem.stock_quantity > answer.quantity) {
					var newStock = chosenItem.stock_quantity - answer.quantity;
					connection.query("UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: newStock
						},
						{
							item_id: chosenItem.item_id
						}
					],
					function(err) {
						if (err) throw err;
						let totalPrice = chosenItem.price * answer.quantity;
						console.log(`success! You bought ${answer.quantity} ${chosenItem.product_name}(s) for $${totalPrice}. Thank you for shopping at Bamazon!`);
						storeDisplay();
					})
				} else {
					console.log("Sorry, something went wrong. Please try again.");
					storeDisplay();
				}
			})
		});
	}
