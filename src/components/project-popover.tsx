import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import { useProjectModal } from 'screens/project-list/util';
import { useProjects } from 'utils/project';
import { ButtonNoPadding } from './lib';

export const ProjectPopover = () => {
  // refecth用来更新缓存
  const { data: projects, refetch } = useProjects();
  const { open } = useProjectModal();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider></Divider>
      <ButtonNoPadding onClick={open} type={'link'}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
