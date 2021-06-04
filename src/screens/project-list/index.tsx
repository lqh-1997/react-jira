import { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from 'utils';
import { useHttp } from 'utils/http';

export const ProjectListScreen = () => {
  // 这个是当前选择的人物信息
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedParam = useDebounce(param, 200);

  // 这个是可选择的用户列表
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList);
  }, [client, debouncedParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
