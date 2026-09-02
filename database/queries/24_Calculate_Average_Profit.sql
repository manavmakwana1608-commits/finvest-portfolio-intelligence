SELECT
AVG(
(i.Units*m.CurrentMarketPrice)-
(i.Units*i.PurchasePrice)
) AS AverageProfit
FROM Investments i
JOIN MarketData m
ON i.InvestmentName=m.InvestmentName;