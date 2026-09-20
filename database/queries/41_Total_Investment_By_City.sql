SELECT
u.City,
SUM(i.Units*i.CurrentPrice) AS TotalInvestment
FROM Users u
JOIN Accounts a
ON u.UserID=a.UserID
JOIN Investments i
ON a.AccountID=i.AccountID
GROUP BY u.City
ORDER BY TotalInvestment DESC;