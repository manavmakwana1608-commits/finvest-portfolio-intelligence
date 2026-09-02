CREATE OR REPLACE VIEW RecentTransactions AS
SELECT
    t.TransactionID,
    u.FullName,
    s.CompanyName,
    t.TransactionType,
    t.Quantity,
    t.Price,
    t.TransactionDate
FROM transactions t
JOIN orders o ON t.OrderID = o.OrderID
JOIN users u ON o.UserID = u.UserID
JOIN stocks s ON o.StockID = s.StockID
ORDER BY t.TransactionDate DESC;