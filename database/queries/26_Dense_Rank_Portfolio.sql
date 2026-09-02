SELECT
InvestmentName,
Units*CurrentPrice AS PortfolioValue,
DENSE_RANK() OVER(
ORDER BY Units*CurrentPrice DESC
) AS Ranking
FROM Investments;