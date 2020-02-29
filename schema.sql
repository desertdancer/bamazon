DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);
SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("product-1", "department-1", 15.00, 100),
("product-2", "department-1", 15.00, 100),
("product-3", "department-1", 25.00, 200),
("product-4", "department-2", 50.00, 500),
("product-5", "department-2", 10.00, 50);

