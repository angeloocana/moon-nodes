import fs from 'fs';
import R from 'ramda';
import moment from 'moment';
import jsonfile from 'jsonfile';

/* eslint-disable no-console */

const log = a => b => { // eslint-disable-line no-unused-vars
  console.log(a, b);
  return b;
};

const getDate = (year, date) =>
  moment(year + ' ' + date, 'YYYY MMM DD  HH:mm');

const isEmpty = R.compose(R.isEmpty, R.trim);

const getDateToAdd = (date, rawDate) =>
  date.isValid() && !isEmpty(rawDate)
    ? date.format('MMDDHHmm')
    : null;

const contents = fs.readFileSync(__dirname + '/moonnodes.txt', 'utf8');

const years = R.pipe(
  R.split('\n'),
  R.map(l => [R.slice(1, 5, l), R.slice(13, 26, l), R.slice(36, 49, l)]),
  R.reduce((data, [year, ascending, descending]) => {

    const lastYear = year * 1 > 2000
      ? year
      : data.lastYear;

    const ascDate = getDate(lastYear, ascending);
    const descDate = getDate(lastYear, descending);

    if (isEmpty(ascending) && isEmpty(descending)) {
      return data;
    }

    if (!ascDate.isValid() && !descDate.isValid()) {
      return data;
    }

    return R.merge(data, {
      [lastYear]: (data[lastYear] || [])
        .concat([[
          getDateToAdd(ascDate, ascending),
          getDateToAdd(descDate, descending),
        ]]),
      lastYear,
    });
  }, { lines: [] }),
  R.omit(['lines', 'lastYear'])
  // log('reduce: '),
)(contents);

jsonfile.writeFileSync(__dirname + '/years.json', years);
