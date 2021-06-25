import { useQuery } from 'react-query';
import { User } from 'types/user';
import { useHttp } from './http';

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();
//   useEffect(() => {
//     run(client('users', { data: cleanObject(param || {}) }));
//   }, [client, param, run]);

//   return result;
// };

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[], Error>(['users', param], () => client('users', { data: param }));
};
