import { useAuth } from 'context/auth-context';
// import { FormEvent } from 'react';
import { Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';

export const LoginScreen = () => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    // elements 集合可返回包含表单中所有元素的数组
    // 因为elements[0] 会被自动推断成为Element类型的元素 但是该类型并没有value属性
    // 所以我们要手动提示其为InputElement类型的元素
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
