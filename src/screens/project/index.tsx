import { Link } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router';
import { KanbanScreen } from 'screens/kanban/index';
import { EpicScreen } from 'screens/epic/index';

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/* 最前面加上斜线代表根路由 所以这里要把斜线删掉 */}
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  );
};
