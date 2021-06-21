import { cleanObject } from './index';
import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

// 传入url中param的键值数组 返回[一个对象包含他们的键值对, 一个set函数]
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    // https://react.docschina.org/docs/hooks-reference.html#usememo
    // useMemo的作用是仅会在某个依赖项改变时才重新计算 memoized 值， 所以即使keys.reduce每次返回的值(引用地址)都不同也不会改变
    // 而且因为keys和searchParams是通过useState创建 react判断其只有被刻意调用set方法修改时才算是改变
    // 返回值数组的第一个参数 key:value
    useMemo(
      () =>
        // reduce会推断初始类型为返回的类型 所以我们需要强制将{}类型定义
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' };
        }, {} as { [key in K]: string }),
      [keys, searchParams],
    ),
    // 返回的第二个参数 useSearchParams 的set函数 如果不考虑set的typescript范围的话 可以直接返回setSearchParam
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
    // 如果不加上 as const 类型会显示为{}[] 会认为数组中所有的项都为对象
  ] as const;
};

// 通用用来重置url的方法 因为上面那个方法返回的set只能改变自己传入的变量的value
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
