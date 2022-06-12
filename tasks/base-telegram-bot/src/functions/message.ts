import moment from 'moment';
import { Output } from './forecast';

export function genMessage(output: Output[]): string {
  return `Погода в Киеве:\n${output
    .map(
      (arr) =>
        `${moment(arr[0].date).locale('ru').format('MMM D dddd')}:\n${arr
          .map(
            (obj) => `\t\t${obj.time}, ${obj.temperature}, ощущается: ${obj.feels}, ${obj.weather}`,
          )
          .join('\n')}\n`,
    )
    .join('\n')}`;
}
