// import { ProjectListScreen } from 'screens/project-list/index';
// import { TsReactTest } from 'screens/TsGenericTest/index';
// import { LoginScreen } from 'screens/login';
import { AuthenticatedApp } from 'authenticated.app';
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
      {user ? <AuthenticatedApp></AuthenticatedApp> : <UnauthenticatedApp></UnauthenticatedApp>}
    </div>
  );
}

export default App;
