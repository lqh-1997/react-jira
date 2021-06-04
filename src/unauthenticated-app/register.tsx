import { useAuth } from 'context/auth-context';
import { FormEvent } from 'react';

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // elements 集合可返回包含表单中所有元素的数组
    // 因为elements[0] 会被自动推断成为Element类型的元素 但是该类型并没有value属性
    // 所以我们要手动提示其为InputElement类型的元素
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
