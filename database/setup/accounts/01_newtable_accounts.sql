USE finvest_db;

CREATE TABLE accounts (
    AccountID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    AccountType VARCHAR(50),
    BrokerName VARCHAR(100),
    Balance DECIMAL(15,2),
    RiskLevel VARCHAR(20),
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (UserID) REFERENCES users(UserID)
);