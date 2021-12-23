import React, { useState } from "react";
// styled components
import { SearchWrapper, ResultWrapper } from "./styled";
import { fetchInstance } from "../utils/fetch-instance";
// default icon
import weatherIcon from "../img/weather.png";
// dayjs
import dayjs from "dayjs";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

export const SearchBox = () => {
  // states
  const [weatherData, setWeatherData] = useState([]);
  const [forecastArray, setForecastArray] = useState([]);
  const [city, setCity] = useState("");
  const [className, setClassName] = useState("");
  // connection
  const getWeather = (e) => {
    if (e.key === "Enter") {
      fetchInstance(city)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setForecastArray(data.forecast.forecastday);
          setCity("");
          console.log(data);
          setClassName("");
        });
    }
  };

  // average temperature logic and date formater

  let sumOf3daysTemp = 0;
  let averageTemFor3Dayslocal = undefined;
  let firstDate = "";
  let lastDate = "";
  let arrayForHours = [];

  if (forecastArray.length > 0) {
    sumOf3daysTemp = forecastArray.reduce((total, currentValue) => {
      return (total += currentValue.day.avgtemp_c);
    }, 0);

    if (sumOf3daysTemp) {
      averageTemFor3Dayslocal = sumOf3daysTemp / forecastArray.length;
    }
    let myArr = forecastArray;
    firstDate = myArr[0].date.slice(-2);
    lastDate = myArr[myArr.length - 1].date.slice(-2);
    arrayForHours = forecastArray[0].hour;
  }

  // date format
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month} ${firstDate}-${lastDate} ${year}`;
  };

  // gradient

  const MAX_RANGE = 40;

  const blue = [0, 0, 255]; // represents -40C deg
  const aqua = [0, 255, 255]; // represents 0C deg
  const orange = [255, 127, 0]; // represents 40C deg

  const getLinearGradient = (avgTemp) => {
    // when avgTemp is undefined (initial value)
    if (avgTemp === undefined) {
      return `linear-gradient(to bottom right, #469cf333 0%, rgba(${[
        ...aqua,
      ]},0.2) 50%, #fae9b2ea 100%)`;
    }

    const percentageBasedOnAvgTempAndMaxRange =
      (Math.abs(avgTemp) / MAX_RANGE) * 100;

    // when avgTemp is lower or equal than zero & greater than MAX_RANGE
    if (-MAX_RANGE <= avgTemp && avgTemp <= 0) {
      const baseValueGreen = Math.abs(blue[1] - aqua[1]);

      const baseGreen =
        255 - (baseValueGreen * percentageBasedOnAvgTempAndMaxRange) / 100;

      const fiftyPercentLeftGreen = baseGreen - baseGreen * 0.5;

      const fiftyPercentRightGreen = baseGreen + baseGreen * 0.5;

      return `linear-gradient(to bottom right, rgb(0,${fiftyPercentLeftGreen},255) 0%, rgb(0,${baseGreen},255) 50%, rgb(0,${fiftyPercentRightGreen},255) 100%)`;
    }

    if (MAX_RANGE >= avgTemp && avgTemp > 0) {
      const baseValueRed = Math.abs(aqua[0] - orange[0]);
      const baseValueGreen = Math.abs(aqua[1] - orange[1]);
      const baseValueBlue = Math.abs(aqua[2] - orange[2]);

      const baseRed =
        (baseValueRed * percentageBasedOnAvgTempAndMaxRange) / 100;
      const baseGreen =
        255 - (baseValueGreen * percentageBasedOnAvgTempAndMaxRange) / 100;
      const baseBlue =
        255 - (baseValueBlue * percentageBasedOnAvgTempAndMaxRange) / 100;

      const fiftyPercentLeftRed = baseRed * 0.5;
      const fiftyPercentLeftGreen = baseGreen + (255 - baseGreen) * 0.5;

      const fiftyPercentLeftBlue = baseBlue + (255 - baseBlue) * 0.5;

      const fiftyPercentRightRed = baseRed + baseRed * 0.5;
      const fiftyPercentRightGreen =
        baseGreen - (baseGreen - baseValueGreen) * 0.5;
      const fiftyPercentRightBlue = baseBlue - baseBlue * 0.5;

      return `linear-gradient(to bottom right, rgb(${fiftyPercentLeftRed},${fiftyPercentLeftGreen},${fiftyPercentLeftBlue}) 0%, rgb(${baseRed},${baseGreen},${baseBlue}) 50%, rgb(${fiftyPercentRightRed},${fiftyPercentRightGreen},${fiftyPercentRightBlue}) 100%)`;
    }
  };

  const linearGradient = getLinearGradient(averageTemFor3Dayslocal);

  // styles for gradient div
  const styleDiv = {
    background: linearGradient,
    width: "100%",
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <div style={styleDiv} className="styleDiv">
      <SearchWrapper
        onKeyPress={() => setClassName("full")}
        className={`${className}`}
      >
        <div className="left">
          <div className="icon">
            {typeof weatherData.current != "undefined" ? (
              <img src={weatherData.current.condition.icon} alt="" />
            ) : (
              <img src={weatherIcon} alt="" />
            )}
          </div>
        </div>

        <div className="right">
          <input
            type="text"
            placeholder="Please enter your location..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </SearchWrapper>

      <ResultWrapper>
        <div className="info">
          {typeof weatherData.current != "undefined" ? (
            <h2>{weatherData.location.name}</h2>
          ) : (
            ""
          )}
          <Swiper
            spaceBetween={10}
            slidesPerView={8}
            breakpoints={{
              840: {
                slidesPerView: 5,
              },
              620: {
                slidesPerView: 4,
              },
              425: {
                slidesPerView: 3,
              },
              384: {
                slidesPerView: 2,
              },
              376: {
                slidesPerView: 1,
              },
              320: {
                slidesPerView: 1,
              },
            }}
          >
            {typeof weatherData.current != "undefined"
              ? arrayForHours.map((hour) => (
                  <SwiperSlide
                    spaceBetween={5}
                    slidesPerView={8}
                    key={hour.time_epoch}
                  >
                    <h3>{hour.time.slice(11)}</h3>
                    <img src={hour.condition.icon} alt="" />
                    <h4>{Math.round(hour.temp_c)}&#176;c</h4>
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>
          <div className="temp">
            {typeof weatherData.current != "undefined" ? (
              <h2>
                {Math.round(averageTemFor3Dayslocal)}

                <span>&#176;C</span>
              </h2>
            ) : (
              ""
            )}
          </div>

          <div className="date">
            {typeof weatherData.current != "undefined" ? (
              <h2>{dateBuilder(new Date())}</h2>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="days-wrapper">
          {forecastArray.map((day) => (
            <div className="days" key={day.date_epoch}>
              <h3>{dayjs(day.date).format("dddd")}</h3>

              <img
                src={
                  day.day.condition.icon ? day.day.condition.icon : weatherIcon
                }
                alt=""
              />

              <h4>
                Max:{Math.round(day.day.maxtemp_c)}
                <span>&#176;c</span>
              </h4>

              <h4>
                Min:{Math.round(day.day.mintemp_c)}
                <span>&#176;c</span>
              </h4>
            </div>
          ))}
        </div>
      </ResultWrapper>
    </div>
  );
};
