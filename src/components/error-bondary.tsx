import React from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// react-error-boundary 用来处理边界异常的库
// Component<P, S> 一般P视为Props(要使用该函数时给它传入的属性第一个属性为children 第二个为fallbackRender作为备用方案) S视为State
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  constructor(props: { fallbackRender: FallbackRender }) {
    super(props);
    this.state = { error: null };
  }

  // 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch()
  // 这两个生命周期方法中的任意一个（或两个）时， 那么它就变成一个错误边界。
  // 当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // 渲染的时候查看state是否包含error 有就渲染备用方案 无就直接渲染
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
