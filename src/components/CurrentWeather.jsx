import API_KEY from "./apikey"
import { useEffect, useState } from "react"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const CurrentWeather = ({ lon, lat, getIcon, windowWidth }) => {
    const [city, setCity] = useState(null);
    const [description, setDescription] = useState(null);
    const [temp, setTemp] = useState(null);
    const [icon, setIcon] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [imgBackground, setImgBackground] = useState(null);

    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleDateString(
        "default",
        { month: "short" }
    )}`;

    const chooseImage = (windowWidth, source) => {
        if (windowWidth <= 768) {
            return source.web;
        } else {
            return source.web;
        }
    };

    const getCityImage = async function (city) {
        try {
            const response = await fetch(
                `https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase()}/images/`
            );
            if (response.ok) {
                const data = await response.json();
                console.log("Image found: ", data.photos[0].image);
                setImgBackground(chooseImage(windowWidth, data.photos[0].image));
            } else {
                throw new Error("Error fetching image");
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Fetching weather data failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetching weather data found", data);
            setCity(data.name);
            setDescription(data.weather[0].description);
            setTemp(data.main.temp);
            setIcon(getIcon(data.weather[0].description.toString()));
            setFeelsLike(data.main.feels_like);
            getCityImage(data.name);
        })
        .catch((err) => console.log("ERROR", err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lon, lat]);

    return (
        <Container className="position-relative" fluid>
            <Image
                className="py-4 my-4"
                src={imgBackground ? imgBackground : ""}
                alt="background-img"
                fluid
            />
            <Row className="flex-column position-absolute top-0 w-100 glass-main">
                <Col sx={12}>
                <div>
                    <p className="fw-bold mt-3 mb-0 mx-3 text-white text-shadow">
                        {city}
                    </p>
                    <p className="my-0 text-white mx-3 text-shadow">
                        <small>{formattedDate}</small>
                    </p>
                </div>
                </Col>
                <Col sx={12}>
                <Row className="mb-3 z-1">
                    <Col className="d-flex">
                        <Image className="w-50 p-1 me-2 p-2" src={icon} />
                        <h1 className="ms-1 p-1 text-white text-shadow">
                        {temp ? temp.toFixed(1) : ""}°C
                        </h1>
                    </Col>
                    <Col className="m-3 mt-1 ms-0 d-flex flex-column align-items-start text-white">
                        <h6 className="fw-blod mb-0 text-capitalize text-shadow">
                        {description}
                        </h6>
                        <p className="m-0 ">
                        <small className="text-shadow">
                            Feels like {feelsLike ? feelsLike.toFixed(1) : ""}°
                        </small>
                        </p>
                    </Col>
                </Row>
            </Col>
            </Row>
        </Container>
    );
};

export default CurrentWeather