SELECT
InvestmentName,

ROUND(
((CurrentPrice-PurchasePrice)
/PurchasePrice)*100,
2
) AS ROI

FROM Investments

ORDER BY ROI DESC;