import { useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { Typography } from 'antd';
import { useUrlQueryParam } from 'utils/url';

export const ProjectListScreen = () => {
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId']);
  const [param, setParam] = useUrlQueryParam(keys);

  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle('项目列表', false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []}></List>
    </Container>
  );
};

// 用来查看该组件内部什么地方造成了无限渲染等错误
// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
