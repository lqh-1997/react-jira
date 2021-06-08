import React from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// react-error-boundary 用来处理边界异常的库
// Component<P, S> 一般P视为Props(要使用该函数时给它传入的属性第一个属性为children 第二个为fallbackRender作为备用方案) S视为State
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 子组件抛出异常 这里会接受并调用
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
