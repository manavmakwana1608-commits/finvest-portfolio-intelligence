CREATE TABLE Accounts (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    AccountType VARCHAR(50),
    Balance DECIMAL(12,2),
    RiskLevel VARCHAR(20),

    FOREIGN KEY (UserID)
    REFERENCES Users(UserID)
);