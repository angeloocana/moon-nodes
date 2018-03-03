console.log('Hello!');

const fs = require('fs');
const R = require('ramda');
const moment = require('moment');
const jsonfile = require('jsonfile');

const log = a => b => {
    console.log(a, b);
    return b;
}


const getDays = (a, b) => ((((a - b) / 1000) / 60) / 60) / 24;

console.log('getDays: ', getDays(moment('2018 May 20  13:13'), moment('2018 Jun 03  12:39')));

const ascInit = moment('2001 Jan 09  13:53', 'YYYY MMM DD  HH:mm');

for (var i = 2010; i < 2032; i++) {
    console.log(ascInit.add(27.21222 * (i - 2010), 'days'));
}

/*
const getCycles = date => getDays(moment(date), ascInit) / 27.21222;

const getCycle = date => Math.round(getCycles(date)) % 2 === 0
    ? 'asc'
    : 'desc';


test('2010-01-05');
test('2013-01-01');
test('2020-01-01');
test('2014-01-01');
test('2022-01-01');
test('2018-01-01');
test('2014-01-01');
test('2015-01-01');

*/

const getDate = (year, date) => moment(year + ' ' + date, 'YYYY MMM DD  HH:mm');

const isEmpty = R.compose(R.isEmpty, R.trim);

const getCycle = years => rawDate => {
    const date = moment(rawDate);
    const lines = years[date.year()];
    
    // console.log('lines: ', lines);

    return lines.reduce((cycle, line) => {
        const [asc, desc] = line;

        if (cycle) {
            return cycle;
        }

        if (date >= asc) {
            if (desc === null || date < desc) {
                return 'asc';
            }
            
            const nextAsc = R.path([lines.indexOf(line) + 1, 1], lines);

            if(date < nextAsc){
                return 'desc';
            }
        }

        if(desc === null){
            return 'desc';
        }

        return cycle;
    }, null);
};

const getDateToAdd = (date, rawDate) => 
    date.isValid() && !isEmpty(rawDate)
        ? date.format('YYYYMMDDHHmm')
        : null;

fs.readFile('moonnodes.txt', 'utf8', (err, contents) => {
    if (err) {
        console.error(err);
    }

    const years = R.pipe(
        R.split('\n'),
        // log('split:'),
        R.map(l => [R.slice(1, 5, l), R.slice(13, 26, l), R.slice(36, 49, l)]),
        // log('slice: '),
        R.reduce((data, [year, ascending, descending]) => {

            const lastYear = year * 1 > 2000
                ? year
                : data.lastYear;

            // console.log('year: ', year, ' lastYear: ', data.lastYear, ' newYear: ', lastYear);

            const ascDate = getDate(lastYear, ascending);
            const descDate = getDate(lastYear, descending);

            // console.log('ascending-', ascending, '-------', ascDate, '----' , lastYear + ' ' + ascending);

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
        ({ lines, lastYear, ...years}) => years,
        // oldData => R.reduce((data, date) => {

        //        }, [], oldData),
        // cycles => cycles % 2 === 0 ? 'desc' : 'asc',
        log('reduce: '),
    )(contents);

    const get = getCycle(years);

    jsonfile.writeFile('years.json', years, console.error)

    const test = date => console.log(date, ' - ', get(date));

    test('2001-05-12');
    test('2001-05-27');
    test('2002-01-04');
    test('2002-01-12');
    test('2001-12-25');
    test('2001-12-30');
});


const getMoonnodes = R.pipe(
    oldYears => R.reduce((years, year) => {
        const cycles = oldYears[year].map(([a, d]) => [moment(a), moment(d)])
        return R.merge(years, {
            [year]: cycles
        });
    }, {}, R.keys(oldYears))
);

const moonnodes = getMoonnodes({
    2001: [
        ['2001-01-09 13:53', '2001-01-22 22:22']
    ]
});

console.log('moonnodes: ', moonnodes);