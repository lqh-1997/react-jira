import { useEffect, useState } from 'react';

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

export const useMount = (callback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);

    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
