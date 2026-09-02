SELECT
    c.FirstName,
    o.Product,
    o.Amount
FROM Customers c
INNER JOIN Orders o
ON c.CustomerID = o.CustomerID;