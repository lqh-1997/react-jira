import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from './utils';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { CreateTask } from './create-task';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteKanban } from 'utils/kanban';
import { Row } from 'components/lib';
import React from 'react';
import { Drag, Drop, DropChild } from 'components/drap-and-drop';

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  return name ? <img src={name === 'task' ? taskIcon : bugIcon} alt={name}></img> : null;
};

const TaskCart = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }} key={task.id}>
      <Mark keyword={keyword} name={task.name}></Mark>
      <br />
      <TaskTypeIcon id={task.typeId}></TaskTypeIcon>
    </Card>
  );
};

// 因为KanbanColumn作为Drag的child存在的 所以需要将ref和props传递
export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container ref={ref} {...props}>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id}></More>
      </Row>
      <TasksContainer>
        <Drop type={'ROW'} direction={'vertical'} droppableId={String(kanban.id)}>
          {/* 给它一个高度 防止没有元素的时候无法drop到该容器中 */}
          <DropChild style={{ minHeight: '1rem' }}>
            {tasks?.map((task, index) => (
              <Drag key={task.id} index={index} draggableId={'task' + task.id}>
                <div>
                  <TaskCart task={task} key={task.id}></TaskCart>
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id}></CreateTask>
      </TasksContainer>
    </Container>
  );
});

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板？',
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={'link'} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0%.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
