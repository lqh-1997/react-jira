import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectModal, useProjectsSearchParams } from './util';
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib';

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={'link'}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
      <ErrorBox error={error}></ErrorBox>
      <List loading={isLoading} dataSource={list || []} users={users || []}></List>
    </Container>
  );
};

// 用来查看该组件内部什么地方造成了无限渲染等错误
// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
