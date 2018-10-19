import { Component, OnInit } from "@angular/core";

import { ICurrentWeather } from "../interfaces";
import { WeatherService } from "../weather/weather.service";

//test commit

@Component({
  selector: "app-current-weather",
  templateUrl: "./current-weather.template.html",
  styles: [""]
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .getCurrentWeather("Moscow", "RU")
      .subscribe(data => (this.current = data));
  }
}
