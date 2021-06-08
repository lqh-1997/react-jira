import { useAuth } from 'context/auth-context';
// import { FormEvent } from 'react';
import { Form, Input } from 'antd';
import { LongButton } from './index';
import { useAsync } from 'utils/use-async';

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (
    /**event: FormEvent<HTMLFormElement>**/ {
      cpassword,
      ...values
    }: { username: string; password: string; cpassword: string },
  ) => {
    // elements 集合可返回包含表单中所有元素的数组
    // 因为elements[0] 会被自动推断成为Element类型的元素 但是该类型并没有value属性
    // 所以我们要手动提示其为InputElement类型的元素
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'));
      return;
    }
    try {
      await run(register(values));
    } catch (err) {
      onError(err);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item name="cpassword" rules={[{ required: true, message: '请确认密码' }]}>
        <Input placeholder="请确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
