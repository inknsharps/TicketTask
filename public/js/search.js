const cityInput = document.querySelector("#get-city");
const searchCityButton = document.querySelector(".search-city");

const searchCity = async (event) => {
    event.stopPropagation();
    const searchedCity = cityInput.value;
    
    const response = await fetch(`api/locations/search?city=${searchedCity}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.replace(`/search/?city=${searchedCity}`)
    } else {
        alert("Events in this city not found!");
    };
};

searchCityButton.addEventListener("click", searchCity);