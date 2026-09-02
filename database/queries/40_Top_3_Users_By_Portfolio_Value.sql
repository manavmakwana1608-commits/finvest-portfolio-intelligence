SELECT
u.FullName,
SUM(i.Units * i.CurrentPrice) AS PortfolioValue
FROM Users u
JOIN Accounts a
ON u.UserID = a.UserID
JOIN Investments i
ON a.AccountID = i.AccountID
GROUP BY u.FullName
ORDER BY PortfolioValue DESC
LIMIT 3;