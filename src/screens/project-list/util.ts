import { useMemo, useState } from 'react';
import { useProject } from 'utils/project';
import { useSetUrlSearchParam, useUrlQueryParam } from 'utils/url';

export const useProjectsSearchParams = () => {
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId']);
  const [param, setParam] = useUrlQueryParam(keys);
  return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

export const useProjectsQueryKey = () => {
  const [param] = useProjectsSearchParams();
  return ['projects', param];
};

// 在url中保存状态 将该方法用作为全局状态管理器的功能
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);

  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' });
  // FIXME 不能够像下面这样写 因为react会合并setState操作 所以Id会无法set为null?
  // const close = () => {
  //   setEditingProjectId({ editingProjectId: undefined });
  //   setProjectCreate({ projectCreate: undefined });
  // };
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

  // 因为useSearchParams返回的都是字符串 所以用 projectCreate 和 'true' 进行比较
  // 一般返回的数据数量在三个以内建议返回tuple 返回的数量多就返回对象
  // tuple的好处是随意命名
  // 对象的好处是引入顺序个数随意
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
