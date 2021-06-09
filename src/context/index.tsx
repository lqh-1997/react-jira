import { ReactNode } from 'react';
import { AuthProvider } from 'context/auth-context';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

// childern就是index.tsx中的<App />
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        {/* 这样写就相当于<AuthProvider children={children}></AuthProvider> */}
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};
