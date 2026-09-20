SELECT
InvestmentName,
PurchasePrice,
CurrentPrice,
(CurrentPrice - PurchasePrice) AS ProfitPerUnit
FROM Investments;