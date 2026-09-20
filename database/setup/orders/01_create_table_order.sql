USE finvest_db;

CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT,
    Product VARCHAR(100) NOT NULL,
    Amount DECIMAL(10,2),

    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)
);