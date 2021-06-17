import { useMemo, useState } from 'react';
import { useUrlQueryParam } from 'utils/url';

export const useProjectsSearchParams = () => {
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId']);
  const [param, setParam] = useUrlQueryParam(keys);
  return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

// 在url中保存状态 将该方法用作为全局状态管理器的功能
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // 因为useSearchParams返回的都是字符串 所以用 projectCreate 和 'true' 进行比较
  // 一般返回的数据数量在三个以内建议返回tuple 返回的数量多就返回对象
  // tuple的好处是随意命名
  // 对象的好处是引入顺序个数随意
  return { projectModalOpen: projectCreate === 'true', open, close };
};
