import { useEditConfig, useAddConfig, useDeleteConfig } from './use-optimistic-options';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Project } from 'types/project';
import { useHttp } from './http';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // 用普通的方式请求projects
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [client, param]);
  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  //   // run是一个非状态的非基本类型 不能将它放到依赖里 否则会带来无限循环的问题
  // }, [fetchProjects, param, run]);
  // return result;

  // 用react-query请求projects
  // 将tuple作为参数传递给useQuery时 其为监听变化的值(变化就会触发后面的函数)
  return useQuery<Project[], Error>(['projects', param], () => client('projects', { data: param }));
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  // 用普通的方式修改project
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) =>
  //   run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: 'PATCH',
  //     }),
  //   );
  // return {
  //   mutate,
  //   ...asyncResult,
  // };

  // 用react-query修改project
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey),
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  // 用普通的方式添加project
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: 'POST',
  //     }),
  //   );
  // };

  // return {
  //   mutate,
  //   ...asyncResult,
  // };

  // 用react-query添加project
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: 'POST',
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey),
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  // useQuery第三个参数为配置参数 这里配置当id不存在时不触发该请求
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id,
  });
};
