import { useEffect, useState } from 'react';

/**
 * 是否为假值 null undefined '' NaN 0n false
 * @param {*} value
 * @returns
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * 将函数中为空的对象删掉
 * @param {*} object
 */
export const cleanObject = (object: object) => {
  const result = Object.assign({}, object);
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);

    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(arr: T[]) => {
  const [result, setResult] = useState(arr);

  const add = function (item: T) {
    setResult([...result, item]);
  };
  const clear = function () {
    setResult([]);
  };
  const removeIndex = function (index: number) {
    const copy: T[] = [...result];
    copy.splice(index, 1);
    setResult(copy);
  };

  return { value: result, clear, removeIndex, add };
};
