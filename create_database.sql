CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DEC(8,2),
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 	 ("Skateboard", "Sporting Goods", 25.00, 3)
		,("Basketball", "Sporting Goods", 10.00, 5)
		,("Baseball Bat", "Sporting Goods", 5.00, 4)
		,("Boxing Gloves", "Sporting Goods", 12.00, 2)
		,("Bean Bag Chair", "Household Items", 22.00, 6)
		,("Set of Bathroom Towels", "Household Items", 15.00, 7)
		,("Plastic Containers", "Household Items", 6.00, 50)
		,("Set of 8oz. Glasses", "Household Items", 11.00, 5)
		,("Office Chair", "Household Items", 59.00, 4)
		,("i7 IBM Laptop", "Office Equipment", 1100.00, 3)
		,("Set of Socket Wrenches", "Tools", 125.00, 6)
		,("Tool Box", "Tools", 44.00, 13)
		,("AC/DC Back in Black CD", "Music", 12.00, 7)
		,("Little Women Paperback Book", "Books", 5.00, 5);