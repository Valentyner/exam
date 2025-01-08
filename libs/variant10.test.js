const {
  unsqueeze,
  flatten,
  map,
  forEach,
  filter,
  filterRegExp,
  join,
  identify,
  generalize,
  getArrayDataType,
  last,
  initial,
  contains,
  arraySize
} = require('./variant10');

describe('variant10.js utility functions', () => {

  test('should unsqueeze a 1D array to the required dimensions', () => {
    expect(unsqueeze([1, 2, 3], 2, 0)).toEqual([[1], [2], [3]]);
    expect(unsqueeze([1, 2, 3], 3, 0)).toEqual([[[1]], [[2]], [[3]]]);
  });

  test('should handle scalar values', () => {
    expect(unsqueeze(1, 2, 0)).toEqual([[1]]);
    expect(unsqueeze(1, 3, 0)).toEqual([[[1]]]);
  });

  test('should return the same array if the dimensions match the required', () => {
    expect(unsqueeze([1, 2, 3], 1, 0)).toEqual([1, 2, 3]);
    expect(unsqueeze([[1, 2]], 2, 0)).toEqual([[1, 2]]);
  });

  test('should handle empty arrays correctly', () => {
    expect(unsqueeze([], 2, 0)).toEqual([]);
    expect(unsqueeze([], 3, 0)).toEqual([]);
  });

  test('flatten should convert a multidimensional array into a flat array', () => {
    expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    expect(flatten([1, [], 3])).toEqual([1, 3]);
    expect(flatten([])).toEqual([]);
    expect(flatten(1)).toEqual(1); // Non-array input
  });

  test('map should apply a function to each element of the array', () => {
    expect(map([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
    expect(map([], (x) => x * 2)).toEqual([]);
  });

  test('forEach should call the callback for each element', () => {
    const callback = jest.fn();
    forEach([1, 2, 3], callback);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(() => forEach(null, callback)).toThrow();
  });

  test('filter should filter elements based on the callback', () => {
    expect(filter([1, 2, 3, 4], (x) => x > 2)).toEqual([3, 4]);
    expect(filter([1, 2, 3, 4], (x) => x < 0)).toEqual([]);
    expect(() => filter([[1, 2], [3, 4]], (x) => x > 2)).toThrow(
      'Only one dimensional matrices supported'
    );
  });

  test('filterRegExp should filter elements based on a regular expression', () => {
    expect(filterRegExp(['apple', 'banana', 'apricot'], /^a/)).toEqual(['apple', 'apricot']);
    expect(filterRegExp(['apple', 'banana', 'cherry'], /^z/)).toEqual([]);
    expect(() => filterRegExp([[1, 2], [3, 4]], /test/)).toThrow(
      'Only one dimensional matrices supported'
    );
  });

  test('join should join array elements into a string', () => {
    expect(join([1, 2, 3], '-')).toBe('1-2-3');
    expect(join([], '-')).toBe('');
  });

  test('identify should assign numeric identifiers to sorted array elements', () => {
    expect(identify([1, 1, 2, 2, 3])).toEqual([
      { value: 1, identifier: 0 },
      { value: 1, identifier: 1 },
      { value: 2, identifier: 0 },
      { value: 2, identifier: 1 },
      { value: 3, identifier: 0 }
    ]);
    expect(identify([])).toEqual([]);
    expect(() => identify(null)).toThrow('Array input expected');
  });

  test('generalize should remove numeric identifiers from array elements', () => {
    const input = [
      { value: 1, identifier: 0 },
      { value: 2, identifier: 1 }
    ];
    expect(generalize(input)).toEqual([1, 2]);
    expect(generalize([])).toEqual([]);
    expect(() => generalize(null)).toThrow('Array input expected');
  });

  test('getArrayDataType should return data type of array elements', () => {
    const typeOf = (val) => typeof val;
    expect(getArrayDataType([1, 2, 3], typeOf)).toBe('number');
    expect(getArrayDataType([1, '2', 3], typeOf)).toBe('mixed');
    expect(getArrayDataType([[1, 2], [3, 4]], typeOf)).toBe('number');
    expect(getArrayDataType([[1, 2], [3, '4']], typeOf)).toBe('mixed');
    expect(getArrayDataType([], typeOf)).toBeUndefined();
  });

  test('last should return the last element of the array', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([])).toBeUndefined();
  });

  test('initial should return all elements except the last one', () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
    expect(initial([])).toEqual([]);
  });

  test('contains should check if array contains an item', () => {
    expect(contains([1, 2, 3], 2)).toBe(true);
    expect(contains([1, 2, 3], 4)).toBe(false);
    expect(contains([], 4)).toBe(false);
  });

  test('arraySize should return the size of the array', () => {
    expect(arraySize([1, [2, [3]]])).toEqual([2]);
    expect(arraySize([1,10, 10, 2030, 30, "adasd"])).toEqual([6]);
    expect(arraySize([])).toEqual([0]);
    expect(arraySize(1)).toEqual([]);
  });
});
