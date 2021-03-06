import React, { ReactNode, useCallback } from 'react';
import * as auth from 'auth-provider';
import { User } from 'types/user';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import { useQueryClient } from 'react-query';

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

const AuthContext =
  React.createContext<
    | {
        user: User | null;
        login: (form: AuthForm) => Promise<void>;
        register: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined);

// 用来确定 React DevTools要显示的内容
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>();
  const queryClient = useQueryClient();

  // 以下login 和 register为两种相同的写法 消参（point free）
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then((user) => setUser(user));
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      // 登出的时候清空缓存
      queryClient.clear();
    });

  useMount(
    useCallback(() => {
      run(bootstrapUser());
    }, [run]),
  );

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>;
};

// 用来获取AuthContext中的value
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
