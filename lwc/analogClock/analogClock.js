import { LightningElement, track } from "lwc";
import getWeatherData from "@salesforce/apex/OpenWeatherApi.getWeatherData";

export default class DigitalClock extends LightningElement {
  @track currentTime;
  @track currentDate;
  @track temperature;
  @track weatherConditions = "";
  error;
  weatherData;

  connectedCallback() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.handleWeather();
  }

  updateTime() {
    const dayOptions = { weekday: "short" };
    const monthOptions = { month: "short" };

    // Format the day and month separately with short names
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    this.currentTime = `${hours}:${minutes}:${seconds}`;
    this.currentTime = now.toLocaleTimeString();

    const shortDay = now.toLocaleDateString(undefined, dayOptions);
    const shortMonth = now.toLocaleDateString(undefined, monthOptions);
    const formattedDate = `${shortDay}, ${shortMonth} ${now.getDate()} ${now.getFullYear()}`;
    this.currentDate = formattedDate;
  }

  handleWeather() {
    getWeatherData({ city: "Noida", CountryCode: "IN" })
      .then((result) => {
        const data = result;
        const objstr = data.split("/");
        const mainData = JSON.parse(objstr[1]);
        const condition = JSON.parse(objstr[0]);
        this.temperature = mainData.temp;
        this.weatherConditions = condition.main;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}