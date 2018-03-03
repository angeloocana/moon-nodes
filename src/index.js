import rawYears from './years';
import R from 'ramda';
import moment from 'moment';

/* eslint-disable no-console */

const getDate = year => date =>
  date === null
    ? null
    : moment(year + date, 'YYYYMMDDHHmm');

/**
 * Create map to search from rawYears data
 */
const getYearsMap = oldYears => R.reduce((years, year) => {
  const _getDate = getDate(year);

  const cycles = oldYears[year].map(
    ([a, d]) => [_getDate(a), _getDate(d)]);

  return R.merge(years, {
    [year]: cycles
  });
}, {}, R.keys(oldYears));

const getMoonNode = yearsMap => (rawDate) => {
  const date = moment(rawDate);
  const lines = yearsMap[date.year()];

  return lines.reduce((cycle, line) => {
    const [asc, desc] = line;

    if (cycle) {
      return cycle;
    }

    const lineIndex = lines.indexOf(line);

    if (date >= asc) {
      if (desc === null || date < desc) {
        return 'asc';
      }

      const nextAsc = R.path([lineIndex + 1, 0], lines);

      if (date < nextAsc) {
        return 'desc';
      }
    } else if (lineIndex === 0) {
      return 'desc';
    }

  }, null);
};


const _getMoonNode = getMoonNode(getYearsMap(rawYears));

export default (date, position) => {
  const node = _getMoonNode(date);

  if(R.path(['latitude'], position) < 0){
    return node === 'asc' ? 'desc' : 'asc';
  }

  return node;
};
