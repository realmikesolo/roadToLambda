import axios from 'axios';

async function getWeather(): Promise<any> {
  return await axios
    .get(`http://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        id: '703448',
        appid: process.env.WEATHER_API,
        lang: 'ru',
      },
    })
    .then((res) => res.data);
}

export async function forecast(): Promise<Output[]> {
  const res = await getWeather();
  const output: Output[] = [];
  let tempArr: Output = [];

  for (const obj of res.list) {
    const temp = {
      date: obj.dt_txt.split(' ')[0],
      time: obj.dt_txt.split(' ')[1],
      temperature: `${Math.round(obj.main.temp - 273)}°C`,
      feels: `${Math.round(obj.main.feels_like - 273)}°C`,
      weather: obj.weather[0].description,
    };

    if (tempArr.length && temp.date.split('-')[2] !== tempArr[0].date.split('-')[2]) {
      output.push(tempArr);
      tempArr = [];
    }

    tempArr.push(temp);
  }

  return output;
}

export type Output = Array<{
  date: string;
  time: string;
  temperature: string;
  feels: string;
  weather: string;
}>;
