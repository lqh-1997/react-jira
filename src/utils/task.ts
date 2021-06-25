import { useDebounce } from 'utils';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'types/task';
import { useHttp } from './http';
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from './use-optimistic-options';

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedName = useDebounce(param?.name);

  if (param) {
    param.name = debouncedName;
  }

  return useQuery<Task[], Error>(['tasks', param], () => client('tasks', { data: param }));
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: 'POST',
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey),
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey),
  );
};

// 获取task详情
export const useTask = (id?: number) => {
  const client = useHttp();
  // useQuery第三个参数为配置参数 这里配置当id不存在时不触发该请求
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export interface SortProps {
  // 把formId 重新放到referenceId的前面或者后面
  fromId: number;
  referenceId: number;
  type: 'before' | 'after';
  fromKanbanId: number;
  toKanbanId: number;
}

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client('tasks/reorder', {
      data: params,
      method: 'POST',
    });
  }, useReorderTaskConfig(queryKey));
};
