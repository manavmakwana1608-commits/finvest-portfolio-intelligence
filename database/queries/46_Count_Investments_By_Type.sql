SELECT

InvestmentType,

COUNT(*) AS Total

FROM Investments

GROUP BY InvestmentType;