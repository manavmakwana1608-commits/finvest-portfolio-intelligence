CREATE TABLE Stocks (
    StockID INT AUTO_INCREMENT PRIMARY KEY,
    StockSymbol VARCHAR(10) NOT NULL UNIQUE,
    CompanyName VARCHAR(100) NOT NULL,
    Sector VARCHAR(50),
    Market VARCHAR(20),
    CurrentPrice DECIMAL(10,2),
    MarketCap BIGINT,
    PE_Ratio DECIMAL(6,2),
    DividendYield DECIMAL(5,2),
    IsActive BOOLEAN DEFAULT TRUE
);