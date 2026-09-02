DELIMITER //

CREATE TRIGGER LogInvestment

AFTER INSERT
ON Investments

FOR EACH ROW

BEGIN

INSERT INTO InvestmentLog
(InvestmentName,LogTime)

VALUES
(NEW.InvestmentName,NOW());

END//

DELIMITER ;