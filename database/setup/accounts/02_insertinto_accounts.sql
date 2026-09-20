USE finvest_db;

INSERT INTO accounts
(UserID, AccountType, BrokerName, Balance, RiskLevel)
VALUES
(1, 'Trading', 'Zerodha', 500000, 'High'),
(2, 'Mutual Fund', 'Groww', 250000, 'Medium'),
(3, 'Trading', 'Angel One', 750000, 'High'),
(4, 'Savings', 'HDFC Securities', 150000, 'Low'),
(5, 'Mutual Fund', 'Coin by Zerodha', 300000, 'Medium');