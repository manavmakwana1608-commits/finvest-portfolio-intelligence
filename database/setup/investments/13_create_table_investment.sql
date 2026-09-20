CREATE TABLE Investments (
    InvestmentID INT AUTO_INCREMENT PRIMARY KEY,
    AccountID INT,
    InvestmentName VARCHAR(100),
    InvestmentType VARCHAR(50),
    Units DECIMAL(10,2),
    PurchasePrice DECIMAL(10,2),
    CurrentPrice DECIMAL(10,2),

    FOREIGN KEY (AccountID)
    REFERENCES Accounts(AccountID)
);