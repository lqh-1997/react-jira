import { Link } from 'react-router-dom';
import { Route, Routes, Navigate, useLocation } from 'react-router';
import { KanbanScreen } from 'screens/kanban/index';
import { EpicScreen } from 'screens/epic/index';
import styled from '@emotion/styled';
import { Menu } from 'antd';

const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            {/* 最前面加上斜线代表根路由 所以这里要把斜线删掉 */}
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen />} />
          <Route path={'/epic'} element={<EpicScreen />} />
          {/* 添加replace用来router无法使用后退的问题 */}
          <Navigate to={window.location.pathname + '/kanban'} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
