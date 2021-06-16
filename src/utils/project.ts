import { useCallback, useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [client, param]);

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
    // run是一个非状态的非基本类型 不能将它放到依赖里 否则会带来无限循环的问题
  }, [fetchProjects, param, run]);

  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) =>
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    );

  return {
    mutate,
    ...asyncResult,
  };
};
export const useAddProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST',
      }),
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
