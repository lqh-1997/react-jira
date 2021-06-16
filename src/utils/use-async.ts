import { useCallback, useState } from 'react';
import { useMonutedRef } from 'utils';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  // useState 传入的参数只会在初始渲染中起作用，可以通过一个函数的返回值获得该参数
  // 该功能一般用来防止通过复杂运算获取state所导致每次渲染都要大量运算获取state
  // 所以useState中传入的如果为函数 则会第一次就被调用
  // https://react.docschina.org/docs/hooks-reference.html#lazy-initial-state
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  // 如果要给state设置函数 就用函数返回函数的形式
  // 还可以通过useRef的方式
  const [retry, setRetry] = useState(() => {
    return () => {};
  });

  const mountedRef = useMonutedRef();

  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: 'success',
        error: null,
      }),
    [],
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: 'error',
        data: null,
      }),
    [],
  );

  // 因为run传进来的promise已经是resolve了的实例，所以要重新传入一个promise方法
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据');
      }

      // 同理 如果要给state设置一个函数 就使用返回一个函数的形式
      // 将retry原封不动给retry
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      // 不能使用state 因为使用state进行setState会触发useCallback再次执行
      setState((prevState) => ({ ...prevState, stat: 'loading' }));
      return promise
        .then((data) => {
          // 防止组件已卸载却仍旧赋值
          if (mountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          // 需要主动抛出异常
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError],
  );

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
    retry,
  };
};
