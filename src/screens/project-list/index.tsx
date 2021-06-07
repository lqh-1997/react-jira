import { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from 'utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
