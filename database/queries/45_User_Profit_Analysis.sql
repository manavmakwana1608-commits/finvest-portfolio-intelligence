SELECT

u.FullName,

SUM(
(i.CurrentPrice-i.PurchasePrice)
*i.Units
) AS Profit

FROM Users u

JOIN Accounts a
ON u.UserID=a.UserID

JOIN Investments i
ON a.AccountID=i.AccountID

GROUP BY u.FullName

ORDER BY Profit DESC;