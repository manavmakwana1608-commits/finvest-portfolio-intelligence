SELECT
InvestmentName,
Units,
CurrentPrice,
Units * CurrentPrice AS PortfolioValue
FROM Investments;