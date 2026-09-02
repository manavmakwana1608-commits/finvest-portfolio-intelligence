CREATE VIEW PortfolioSummary AS

SELECT
InvestmentName,
Units,
CurrentPrice,
Units*CurrentPrice AS PortfolioValue
FROM Investments;