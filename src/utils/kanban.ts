import { QueryKey, useMutation, useQuery } from 'react-query';
import { Kanban } from 'types/kanban';
import { useHttp } from './http';
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from './use-optimistic-options';

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[], Error>(['kanbans', param], () => client('kanbans', { data: param }));
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        method: 'POST',
        data: params,
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey),
  );
};

export interface SortProps {
  // 把formId 重新放到referenceId的前面或者后面
  fromId: number;
  referenceId: number;
  type: 'before' | 'after';
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client('kanbans/reorder', {
      data: params,
      method: 'POST',
    });
  }, useReorderKanbanConfig(queryKey));
};
