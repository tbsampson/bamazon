var mysql = require('mysql');//---------------------------------------------------------------------------------- Dependencies
var Table = require('cli-table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({//---------------------------------------------------------------------- Connection
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function selectAll() { //---------------------------------------------------------------------------------------- Display Everything
    connection.query(`SELECT * FROM products`, function(error, response) {
        if (error) { console.log(error) };
        var myTable = new Table({
            head: ['ID', 'Product Name', 'Category', 'Price', 'Qty'],
            colWidths: [4, 30, 18, 7, 5]
        });
        for (i = 0; i < response.length; i++) {
            myTable.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            );
        }
        console.log(myTable.toString());
        queryBuyer();
    });
}; 

function queryBuyer() { //---------------------------------------------------------------------------------------- Query Buyer
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the Item ID of the item you wish to purchase?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to buy?"
        } 

    ]).then(function(answers) {
        var qtyDemand = answers.Quantity;
        var idDemand = answers.ID;
        checkout(idDemand, qtyDemand);
    });

};

function checkout(id, qty) { //------------------------------------------------------------------------------------ Checkout
    connection.query(`SELECT * FROM products WHERE item_id = ${id}`, function(error, response) {
        if (error) { console.log(error) };
        if (qty <= response[0].stock_quantity) {
            var totalCost = response[0].price * qty;
            console.log("In Stock!");
            console.log(`Amount due for ${qty} x ${response[0].ProductName} = $${totalCost}`);
            connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${qty} WHERE item_id = ${id}`);
        } else {
            console.log(`Sorry, there is not enough ${response[0].ProductName} to complete your order. Please try again!`);
        };
        selectAll();
    });

}; 

selectAll();