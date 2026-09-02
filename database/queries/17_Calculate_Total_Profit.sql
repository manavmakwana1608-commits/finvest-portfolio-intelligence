SELECT
InvestmentName,
Units,
(CurrentPrice - PurchasePrice) * Units AS TotalProfit
FROM Investments;