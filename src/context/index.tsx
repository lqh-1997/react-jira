import { ReactNode } from 'react';
import { AuthProvider } from 'context/auth-context';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

// childern就是index.tsx中的<App />
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          {/* 这样写就相当于<AuthProvider children={children}></AuthProvider> */}
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};
