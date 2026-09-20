CREATE TABLE MarketData (
    MarketID INT AUTO_INCREMENT PRIMARY KEY,
    InvestmentName VARCHAR(100),
    CurrentMarketPrice DECIMAL(10,2),
    ChangePercent DECIMAL(5,2),
    LastUpdated DATE
);