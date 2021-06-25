import styled from '@emotion/styled';
import { Spin } from 'antd';
import { Drag, Drop, DropChild } from 'components/drap-and-drop';
import { ScreenContainer } from 'components/lib';
import { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDocumentTitle } from 'utils';
import { useKanbans, useReorderKanban } from 'utils/kanban';
import { useReorderTask, useTasks } from 'utils/task';
import { CreateKanban } from './create-kanban';
import { KanbanColumn } from './kanban-column';
import { SearchPanel } from './search-panel';
import { TaskModal } from './task-modal';
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from './utils';

export const KanbanScreen = () => {
  useDocumentTitle('看板列表');

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel></SearchPanel>
        {isLoading ? (
          <Spin size={'large'}></Spin>
        ) : (
          <ColumnsContainer>
            <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => (
                  <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                    <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban></CreateKanban>
          </ColumnsContainer>
        )}
        <TaskModal></TaskModal>
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: tasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      // 没有排序什么都不做
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? 'after' : 'before';
        reorderKanban({ fromId, referenceId: toId, type });
      }
      // task排序
      if (type === 'ROW') {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTask = tasks.filter((task) => task.kanbanId === fromKanbanId)[source.index];
        const toTask = tasks.filter((task) => task.kanbanId === toKanbanId)[destination.index];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before',
        });
      }
    },
    [kanbans, reorderKanban, reorderTask, tasks],
  );
};

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
