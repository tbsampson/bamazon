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
        checkForUpdates();
    });
}; 

function checkForUpdates() {//------------------------------------------------------------------------------------ Check for Updates
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Choose from the following options:",
        choices: ["Restock", "Add", "Remove", "Quit"]
    }]).then(function(answers) {
        switch (answers.action) {
            case 'Restock':
                restock();
                break;
            case 'Add':
                addNewItem();
                break;
            case 'Remove':
                deleteItem();
                break;
            case 'Quit':
                quit();
                break;
        }
    });
};

function restock() {//-------------------------------------------------------------------------------------------- Restock
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the Item ID of the item you wish to restock?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "Add how many?"
        },

    ]).then(function(answers) {
        var addQty = answers.Quantity;
        var itemID = answers.ID;
        restockDb(itemID, addQty);
    });
}; 

function restockDb(id, qty) {//-------------------------------------------------------------------------------- Database (Update)
     connection.query(`SELECT * FROM Products WHERE item_id = ${id}`, function(error, response) {
        if (error) { console.log(error) };
        connection.query(`UPDATE Products SET stock_quantity = stock_quantity + ${qty} WHERE item_id = ${id}`);
          selectAll();
    });
};

function addNewItem() {//---------------------------------------------------------------------------------------- Add Item
    inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "What is the name of the item you wish to stock?"
        },
        {
            name: 'Category',
            type: 'input',
            message: "What is the category for this product?"
        },
        {
            name: 'Price',
            type: 'input',
            message: "How much would you like this to cost?"
        },
        {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to add?"
        },

    ]).then(function(answers){
    	var name = answers.Name;
    	var category = answers.Category;
    	var price = answers.Price;
    	var quantity = answers.Quantity;
    	addNewItemDb(name,category,price,quantity);
    });
};

function addNewItemDb(name,cat,price,qty){//-------------------------------------------------------------- Database (Insert)
	connection.query(`INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES("${name}","${cat}",${price},${qty})`);
	selectAll();
};

function deleteItem(){
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "What is the Item ID of the item you wish to remove?"
        }]).then(function(answer){
        	var id = answer.ID;
        	deleteItemDb(id);
        });
};

function deleteItemDb(id){//----------------------------------------------------------------------------------------- Database (Delete)
	connection.query(`DELETE FROM Products WHERE item_id = ${id}`);
	selectAll();
};
selectAll();
function quit(){;//-------------------------------------------------------------------------------------------------- Quit
    console.log("Goodbye!")
    process.exit();
}