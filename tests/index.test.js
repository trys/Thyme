const Thyme = require('../index');

describe('new Thyme()', () => {
  test('Instantiates a new Thyme object', () => {
    expect(new Thyme('2018-10-21T00:00:00.000Z')).toMatchObject({
      raw: '2018-10-21',
    });
  });
});

describe('.till()', () => {
  test('Returns the correct range between two dates', () => {
    const christmas = new Thyme('2018-12-25');
    const newYearsDay = new Thyme('2019-01-01T00:00:00.000Z');
    const inBetween = christmas.till(newYearsDay);

    expect(inBetween).toHaveLength(8);
  });
});

describe('.equals()', () => {
  test('Returns false for two different dates', () => {
    const christmas = new Thyme('2018-12-25');
    const newYearsDay = new Thyme('2019-01-01T00:00:00.000Z');

    expect(christmas.equals(newYearsDay)).toBe(false);
  });

  test('Returns true for the same dates', () => {
    const newYearsDay = new Thyme('2019-01-01T00:00:00.000Z');

    expect(newYearsDay.equals(newYearsDay)).toBe(true);
  });
});

describe('.add()', () => {
  const mutableDate = new Thyme('2018-06-12T00:00:00.000Z');

  test('Adds one day', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.add()).toEqual('2018-06-13');
    expect(mutableDate.add()).toEqual('2018-06-13');
  });

  test('Adds two days', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.add(2)).toEqual('2018-06-14');
  });

  test('Adds two days to mutableDate', () => {
    expect(mutableDate.add(2)).toEqual('2018-06-15');
  });
});

describe('.remove()', () => {
  test('Removes one day', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.remove(1)).toEqual('2018-06-11');
  });
});

describe('.getDay()', () => {
  test('Returns the day of the week', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.getDay()).toEqual(2);
  });
});

describe('.getMonth()', () => {
  test('Returns the zero-indexed month', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.getMonth()).toEqual(5);
  });
});

describe('.getFullYear()', () => {
  test('Returns the full YYYY', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.getFullYear()).toEqual(2018);
  });
});

describe('.getDate()', () => {
  test('Returns the correct date', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.getDate()).toEqual(12);
  });
});

describe('.format()', () => {
  test('Returns a formatted date string', () => {
    const date = new Thyme('2018-06-12T00:00:00.000Z');
    expect(date.format()).toEqual('12 June 2018');
  });
});
