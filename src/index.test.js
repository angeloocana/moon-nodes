import './generateRawYearsMap';
import getMoonNode from './';

test('Should return Ascending or Descending by date', () => {

  const expectedDates = [
    ['2013-01-01', 'desc'],
    ['2020-01-01', 'desc'],
    ['2014-01-01', 'asc'],
    ['2022-01-01', 'desc'],
    ['2018-01-01', 'desc'],
    ['2014-01-01', 'asc'],
    ['2015-01-01', 'desc'],

    ['2001-05-12', 'desc'],
    ['2001-05-27', 'asc'],
    ['2002-01-04', 'asc'],
    ['2002-01-12', 'desc'],
    ['2001-12-25', 'desc'],
    ['2001-12-30', 'asc'],
  ];

  const dates = expectedDates.map(([date]) => [date, getMoonNode(date)]);

  expect(expectedDates).toEqual(dates);
});
