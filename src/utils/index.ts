import { useEffect, useRef, useState } from 'react';

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

/**
 * useEffect 第二个参数为[]版本
 * @param callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // 因为依赖加上了callback 所以每一个传入的callback都要使用useCallback包上 否则会造成无限循环
  }, [callback]);
};

/**
 * 防抖
 * @param value
 * @param delay
 * @returns
 */
export const useDebounce = <T>(value: T, delay: number = 200): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);

    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

/**
 * 对某个数组引出三个方法 包括清空 移除某项 和添加一项
 * @param arr
 * @returns
 */
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

/**
 * 用来设置document.title
 * @param title
 * @param keepOnUnmount
 */
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  // useRef能够保持值不变
  // useRef内部值改变的时候不会触发组件的重新渲染
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

/**
 * 回到最初的页面
 * @returns
 */
export const resetRoutes = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂在或者已经卸载，返回false
 * 反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

/**
 * 节流
 * @param value
 * @param delay
 * @returns
 */
export const useThrottle = <T>(value: T, delay: number) => {
  const [throttleValue, setThrottleValue] = useState<T>(value);
  const [prevTime, setPrevTime] = useState(Date.now());

  useEffect(() => {
    const nowTime = Date.now();
    let timer: NodeJS.Timeout;

    // 假如够时间了就直接值 所以下次访问再清空定时器也无所谓
    if (nowTime - prevTime > delay) {
      setThrottleValue(value);
      setPrevTime(Date.now());
    } else {
      // 不够时间就用 还缺少的时间设置定时器 如果再次访问就清空定时器
      timer = setTimeout(() => {
        setThrottleValue(value);
        setPrevTime(Date.now());
      }, delay - (nowTime - prevTime));
    }

    return () => clearTimeout(timer);
  }, [value, prevTime, delay]);

  return throttleValue;
};
