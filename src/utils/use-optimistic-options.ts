import { QueryKey, useQueryClient } from 'react-query';

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 在mutationFn触发之前触发 并且接受与其一样的参数
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    // 当mutationFn发生异常的时候
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.filter((item) => item.id !== target.id) || []);
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) || [],
  );
export const useAddConfig = (queryKey: QueryKey) =>
  // FIXME 没有传入id 会导致增加的时候key报错
  useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]));
