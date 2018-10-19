import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { ICurrentWeather } from "../interfaces";
import { IWeatherService } from "./weather.service.fake";

@Injectable({
  providedIn: "root"
})
export class WeatherService implements IWeatherService {
  constructor(private HttpClient: HttpClient) {}

  getCurrentWeather(
    city: string,
    country: string
  ): Observable<ICurrentWeather> {
    return this.HttpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}` +
        `api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=` +
        `${environment.appId}`
    ).pipe(map(data => this.trasformtoICurrentWeather(data)));
  }

  trasformtoICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    };
  }

  convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67;
  }
}

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}
