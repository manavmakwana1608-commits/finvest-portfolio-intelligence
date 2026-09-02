SELECT
InvestmentName,
Units*CurrentPrice AS PortfolioValue,
RANK() OVER(
ORDER BY Units*CurrentPrice DESC
) AS Ranking
FROM Investments;