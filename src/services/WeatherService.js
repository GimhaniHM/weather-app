import { DateTime } from "luxon";

const API_KEY = "676d164122e22bd31a3e5f08d2f6dc4c";

//const API_KEY = "1891735cfb394923413c67a90e76954f";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

//used to fetch weather data using the OpenWeatherMap API
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    console.log(url);
    return fetch(url)
        .then((response) => response.json())

};

//used to format the current weather data
const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;

    const { main: details, icon } = weather[0]

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }
}

//used to format the forecast weather data
const formatForecastWeather = (data) => {

    let { city, list } = data;
    const timezone = data.city.timezone;

    console.log(data);

    //extract daily forecast weather data
    const daily = list
        .filter((d, index) => index % 8 === 0) // Get data every 24 hours (index divisible by 8)
        .slice(0, 5) // Take the next 5 days
        .map((d) => {
            return {
                title: formatToLocalTime(d.dt, timezone, "ccc"),
                temp: d.main.temp,
                icon: d.weather[0].icon,
            };
        });

    // Extract hourly forecast data
    const hourly = list
        .slice(0, 5) // Take the next 5 times of hourly data
        .map((d) => {
            return {
                title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
                temp: d.main.temp,
                icon: d.weather[0].icon,
            };
        });

    return { timezone, daily, hourly };
}

//function to get formatted weather data (current and forecast)
const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams)
        .then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        units: searchParams.units,
    }).then(formatForecastWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

//format a timestamp to local time
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//generate an icon URL based on the weather icon code
const iconUrlFFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {
    formatToLocalTime,
    iconUrlFFromCode
};
