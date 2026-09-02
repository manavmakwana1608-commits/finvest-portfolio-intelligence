SELECT
u.FullName,
a.RiskLevel,
SUM(i.Units*i.CurrentPrice) AS Portfolio
FROM Users u
JOIN Accounts a
ON u.UserID=a.UserID
JOIN Investments i
ON a.AccountID=i.AccountID
GROUP BY
u.FullName,
a.RiskLevel
ORDER BY Portfolio DESC;