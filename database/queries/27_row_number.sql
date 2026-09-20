SELECT
InvestmentName,
ROW_NUMBER() OVER(
ORDER BY CurrentPrice DESC
) AS RowNum
FROM Investments;