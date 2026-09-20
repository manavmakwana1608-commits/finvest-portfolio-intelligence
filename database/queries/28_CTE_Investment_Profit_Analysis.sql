WITH ProfitData AS
(
SELECT
InvestmentName,
(CurrentPrice-PurchasePrice)*Units AS Profit
FROM Investments
)

SELECT *
FROM ProfitData
WHERE Profit>10000;