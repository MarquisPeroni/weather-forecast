import API_KEY from "./apikey"
import Day from "./Day"
import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useEffect, useState } from "react"


const NextDaysWeather = ({ lon, lat, getIcon, windowWidth, setWindowWidth }) => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState(null);

    const carouselNumber = function () {
        if (data) {
            if (windowWidth <= 576) {
                return data.length / 2;
            } else {
                return data.length / 4;
            }
        }
    };
    const [currentCarousel, setCurrentCarousel] = useState(0);

    useEffect(() => {
        fetch(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Data error");
                }
                return response.json();
            })
            .then((output) => {
                console.log("Fetching weather correct", output);
                setData(output.list);
                setCity(output.city.name);
            })
            .catch((err) => console.log("Fetching error", err));
        }, [lon, lat]);

        useEffect(() => {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, [setWindowWidth]);

        const itemAmountCarousel = function () {
            if (windowWidth <= 576) {
                return 2;
            } else {
                return 4;
            }
        };

        return (
            <>
                <h3 className="border-bottom py-3 ps-2 text-white mb-0">Next Hours in {city}</h3>
                <Carousel
                    className="pb3"
                    onSlide={(incomingIndex) => {
                        setCurrentCarousel(incomingIndex);
                    }}
                >
                    {data &&
                    [...Array(carouselNumber())].map((e, i) => {
                        return (
                            <Carousel.Item key={i}>
                                <Container fluid>
                                    <Row>
                                        {data
                                        .slice(
                                            currentCarousel * itemAmountCarousel(),
                                            itemAmountCarousel() * currentCarousel +
                                                itemAmountCarousel()
                                        )
                                        .map((day) => {
                                        return (
                                            <Day
                                                key={day.dt}
                                                day={day.dt}
                                                date={day.dt_txt}
                                                temp={day.main.temp}
                                                temp_min={day.main.temp_min}
                                                temp_max={day.main.temp_max}
                                                weather={day.weather[0].main}
                                                description={
                                                    day.weather[0].description
                                                }
                                                icon={day.weather[0].icon}
                                                humidity={day.main.humidity}
                                                getIcon={getIcon}
                                            />
                                        );
                                    })}
                                </Row>
                            </Container>
                        </Carousel.Item>
                    );    
                })}
            </Carousel>
        </>
    );
};

export default NextDaysWeather;