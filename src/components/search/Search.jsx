import React, { useState } from "react";
import { GEO_API_URL, geoApi } from "../../apiKey";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    if (inputValue.trim() !== "") {
      setIsLoading(true);
      fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApi)
        .then((response) => response.json())
        .then((response) => {
          const newOptions = response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }));
          setOptions(newOptions);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setOptions([]);
    }
  };

  const handleOptionClick = (selectedOption) => {
    setSearch(selectedOption.label);
    setOptions([]);
    onSearchChange(selectedOption);
  };

  return (
    <div className="mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search a city"
            value={search}
            onChange={handleInputChange}
          />
          {isLoading && <div>Loading...</div>}
          {!isLoading && options.length > 0 && (
            <ul className="list-group mt-2">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;