SELECT
i.InvestmentName,
(i.Units*m.CurrentMarketPrice)-
(i.Units*i.PurchasePrice) AS Profit
FROM Investments i
JOIN MarketData m
ON i.InvestmentName=m.InvestmentName
ORDER BY Profit DESC;