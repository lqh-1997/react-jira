/**
 * 是否为假值 null undefined '' NaN 0n false
 * @param {*} value
 * @returns
 */
export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * 将函数中为空的对象删掉
 * @param {*} object
 */
export const cleanObject = (object) => {
  const result = Object.assign({}, object);
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
