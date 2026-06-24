import "./styles.css";

const getWeekday = (fullDate) => {
    console.log(fullDate);
    const [day, month, year] = fullDate.split("/");
    const date = new Date(year, month - 1, day);
    const weekday = Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);

    return weekday.charAt(0).toUpperCase() + weekday.split("-")[0].slice(1);
};

const ForecastItem = ({ full_date, date, min, max, condition, description }) => {
    return (
        <div className="forecast-item">
            <p className="forecast-day">
                {getWeekday(full_date)} - {date}
            </p>
            <img src={`./icons-weather/${condition}.svg`} alt={description} />
            <p className="forecast-temp">
                {min}/{max}°
            </p>
        </div>
    );
};

export default ForecastItem;
