// import { ProjectListScreen } from 'screens/project-list/index';
// import { TsReactTest } from 'screens/TsGenericTest/index';
// import { LoginScreen } from 'screens/login';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { AuthenticatedApp } from 'authenticated-app';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <TsReactTest></TsReactTest> */}
      {/* <LoginScreen></LoginScreen> */}
      {/* FIXME */}
      {/* @ts-ignore */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
