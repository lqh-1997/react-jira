// 正常登录时显示的内容
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <button onClick={() => logout()}>登出</button>
      <div>{user?.name}</div>
      <ProjectListScreen></ProjectListScreen>
    </div>
  );
};
