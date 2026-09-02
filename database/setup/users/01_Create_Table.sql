USE finvest_db;	
userscustomerscustomersCREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Age INT,
    City VARCHAR(50),
    Email VARCHAR(100) UNIQUE
);
USE finvest_db;

INSERT INTO Customers
(FirstName, LastName, Age, City, Email)
VALUES
('Manav','Makwana',22,'Mumbai','manav@gmail.com'),
('Rahul','Sharma',25,'Delhi','rahul@gmail.com'),
('Priya','Patel',21,'Ahmedabad','priya@gmail.com');