//未登录时使用的文件 可以在这里切换登录或者是注册
import { useState } from 'react';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import { Card } from 'antd';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {isRegister ? <RegisterScreen></RegisterScreen> : <LoginScreen></LoginScreen>}
        <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</button>
      </Card>
    </div>
  );
};
