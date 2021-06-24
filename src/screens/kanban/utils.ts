import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useProject } from 'utils/project';
import { useTask } from 'utils/task';
import { useUrlQueryParam } from 'utils/url';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // 通过正则表达式获取url中projects后面跟的id
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

// 通过上面那个方法获得到的id获取整个project信息
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId']);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      name: param.name,
    }),
    [projectId, param],
  );
};

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId],
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
