import { useState, useCallback, useReducer } from 'react';

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

export const useUndo = <T>(initialPresent: T) => {
  // const [past, setPast] = useState<T[]>([]);
  // const [present, setPresent] = useState(initialPresent);
  // const [future, setFuture] = useState<T[]>([]);

  // 将上面的状态进行合并成为此状态
  const [state, setState] = useState<State<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // 撤回一步操作
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  // 取消撤回一步操作
  const redo = useCallback(() => {
    setState((currentState: State<T>) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent) => {
    setState((currentState: State<T>) => {
      if (newPresent === currentState) return currentState;
      const { past, present } = currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};

// 以下为使用reducer实现状态切换的版本
const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

type Action<T> = { newPresent?: T; type: typeof UNDO | typeof REDO | typeof SET | typeof RESET };

// 第一个参数为当前的状态 第二个参数为自定义参数通过dispatch传入
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;

  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case SET: {
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }

    default: {
      return state;
    }
  }
};

// 使用useReducre的版本
export const useUndo2 = <T>(initialPresent: T) => {
  // 第一个参数为改变状态的reducer函数 第二个参数为状态初始值
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), []);
  const reset = useCallback((newPresent: T) => dispatch({ type: RESET, newPresent }), []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
