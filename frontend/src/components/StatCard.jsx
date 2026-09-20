import "./StatCard.css";

function StatCard({
    title,
    value,
    icon,
}) {
    return (
        <div className="stat-card">

            <div className="stat-card-content">

                <p className="stat-card-title">
                    {title}
                </p>

                <h2 className="stat-card-value">
                    {value}
                </h2>

            </div>

            {icon && (
                <div className="stat-card-icon">
                    {icon}
                </div>
            )}

        </div>
    );
}

export default StatCard;