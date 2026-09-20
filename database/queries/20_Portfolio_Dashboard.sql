SELECT

u.FullName,

a.AccountType,

i.InvestmentName,

i.CurrentPrice,

i.Units,

(i.Units*i.CurrentPrice) AS PortfolioValue,

a.RiskLevel

FROM Users u

JOIN Accounts a
ON u.UserID=a.UserID

JOIN Investments i
ON a.AccountID=i.AccountID

ORDER BY PortfolioValue DESC;