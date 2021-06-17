// 正常登录时显示的内容
import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';
import { ProjectScreen } from 'screens/project';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from 'antd';
import { Navigate, Route, Routes } from 'react-router';
import { resetRoutes } from 'utils';
import { ProjectModal } from 'screens/project-list/project-modal';
import { ProjectPopover } from 'components/project-popover';

// 一个状态要传入多层的子组件被称为 prop drilling

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* <ProjectListScreen /> */}
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />}></Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
          <Navigate to={'/projects'}></Navigate>
        </Routes>
      </Main>
      <ProjectModal></ProjectModal>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoutes}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}></SoftwareLogo>
        </ButtonNoPadding>
        <ProjectPopover></ProjectPopover>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  );
};

// 暂时性死区 temporal dead zone
// 会使该函数'变量提升(并不会赋值undefined 而是只要你不调用引用了该变量的方法就不会报错)'
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <span onClick={() => logout()}>登出</span>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="text"> Hi, {user?.name} </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;
