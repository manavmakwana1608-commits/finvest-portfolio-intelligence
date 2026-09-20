SELECT
SUM(i.Units*m.CurrentMarketPrice) AS TotalPortfolio
FROM Investments i
JOIN MarketData m
ON i.InvestmentName=m.InvestmentName;