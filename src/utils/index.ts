import { useEffect, useState } from 'react';

/**
 * 是否为假值 null undefined '' NaN 0n false
 * @param {*} value
 * @returns
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === null || value === undefined || value === '';

// 这里不能给object赋值给object类型，因为object类型包含范围很广
// 包括函数 各种对象实例等
// 所以我们要特别将object的类型赋值为包含键值对的object
// 就如下所示 {[key: string]: unknow}
/**
 * 将函数中为空的对象删掉
 * @param object
 * @returns
 */
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = Object.assign({}, object);
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖加上callback会造成无限循环 和useCallback 和 useMemo 有关系
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
