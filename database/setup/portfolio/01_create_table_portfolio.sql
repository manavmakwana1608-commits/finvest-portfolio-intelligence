-- ============================================
-- Project : FinVest Investment Analytics
-- File    : 14_Create_Portfolio_Table.sql
-- Purpose : Create Portfolio Table
-- ============================================

USE finvest_db;

CREATE TABLE Portfolio (

    PortfolioID INT AUTO_INCREMENT PRIMARY KEY,

    UserID INT NOT NULL,

    StockID INT NOT NULL,

    Quantity INT NOT NULL,

    AverageBuyPrice DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (UserID)
        REFERENCES Users(UserID),

    FOREIGN KEY (StockID)
        REFERENCES Stocks(StockID)

);