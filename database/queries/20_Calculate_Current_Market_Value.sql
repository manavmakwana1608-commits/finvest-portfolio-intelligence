SELECT
i.InvestmentName,
i.Units,
m.CurrentMarketPrice,
(i.Units*m.CurrentMarketPrice) AS CurrentValue
FROM Investments i
JOIN MarketData m
ON i.InvestmentName=m.InvestmentName;