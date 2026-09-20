SELECT
InvestmentName,

ROUND(
((CurrentPrice-PurchasePrice)
/PurchasePrice)*100,
2
) AS ROI_Percentage

FROM Investments;