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
const getYear = oldYears => year => {
  const _getDate = getDate(year);
  return oldYears[year].map(
    ([a, d]) => [_getDate(a), _getDate(d)]);
};

const getMoonNode = getYear => (rawDate) => {
  const date = moment(rawDate);
  const lines = getYear(date.year());

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

export default getMoonNode(R.memoize(getYear(rawYears)));
