CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    AccountID INT,
    TransactionType VARCHAR(20),
    Amount DECIMAL(12,2),
    TransactionDate DATE,

    FOREIGN KEY (AccountID)
    REFERENCES Accounts(AccountID)
);