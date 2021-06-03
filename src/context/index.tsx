import { ReactNode } from 'react';
import { AuthProvider } from 'context/auth-context';

// childern就是index.tsx中的<App />
export const AppProviders = ({ children }: { children: ReactNode }) => {
  // 这样写就相当于<AuthProvider children={children}></AuthProvider>
  return <AuthProvider>{children}</AuthProvider>;
};
