import React from 'react';

// 用来查看该组件内部什么地方造成了无限渲染等错误
// ProjectListScreen.whyDidYouRender = true;
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    // 将该值设置为true就代表全局检查 否则可以在要检查的组件构造函数下添加属性whyDidYouRender
    trackAllPureComponents: false,
  });
}
