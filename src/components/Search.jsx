import API_KEY from "./apikey"
import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const Search = function ({ setLon, setLat}) {
    const [city, setCity] = useState("London");
    useEffect(() => {
        fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}&`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Fetch API Failed");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetch Loaded", data[0]);
                setCity(data[0].name);
                setLon(data[0].longitude);
                setLat(data[0].latitude);
            })
            .catch((err) => console.log("ERROR", err));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [city]);

        const handleChange = (e) => {
            setCity(e.target.value);
            console.log(city);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            setCity(e.target.value);
            e.target.reset();
        };

        return (
            <Container className="glass-main" fluid>
                <Row className="justify-content-center p-5">
                    <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search Location"
                                aria-label="Search Location"
                                aria-describedby="basic-addon2"
                                onChange={handleChange}
                            />
                            <Button variant="dark" id="button-addon2">Search</Button>
                        </InputGroup>
                    </Form>
                    </Col>
                </Row>
            </Container>
        );
    };

    export default Search


            