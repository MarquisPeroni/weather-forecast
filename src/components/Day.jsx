import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

const Day = ({
    day,
    date,
    temp,
    temp_min,
    temp_max,
    weather,
    icon,
    description,
    humidity,
    getIcon,
}) => {
    const currenntDate = new Date(date);
    const formattedDate = `${currenntDate.getDate()} ${currenntDate.toLocaleDateString(
        "default",
        { month: "short" }
    )}`;
    // `http://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <Col xs={6} sm={3}>
            <div className="d-flex flex-column align-items-center justify-content-center text-white glass my-4 text-shadow-1">
                <p className="mt-3">{formattedDate}</p>
                <Image
                    className="w-50"
                    fluid
                    src={getIcon(description.toString())}
                    alt="daily-mood"
                />
                <p className="mb-0">{weather}</p>
                <p className="mt-0"><small>{description}</small></p>
                <p className="my-0 fw-bold fs-5">{temp.toFixed(1)}°C</p>
                <p className="my-0"><small>Max: {temp_max.toFixed(1)}°C</small></p>
                <p className="mt-0 mb-1"><small>Low: {temp_min.toFixed(1)}°C</small></p>
                <p className="mt-0">{humidity}%</p>
            </div>
        </Col>
    )
}

export default Day