import { User } from '../../types/user';
import { Dropdown, Menu, Modal, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useDeleteProject, useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';
import { useProjectsQueryKey, useProjectModal } from './util';
import { Project } from 'types/project';

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutateAsync: mutate } = useEditProject(useProjectsQueryKey());
  // 函数柯里化 pin作为选择的参数是后传的 id作为一开始就知道的参数将其分开
  // 然后下面调用的部分还使用了point free的手法
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(() => props.refresh?.());

  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            // pin => pinProject(project.id)(pin)
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>;
          },
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name}</span>;
          },
          dataIndex: 'personId',
        },
        {
          title: '创建时间',
          render(value, project) {
            return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '--'}</span>;
          },
          dataIndex: 'created',
        },
        {
          render(value, project) {
            return <More project={project}></More>;
          },
        },
      ]}
      // dataSource={list.map((project) => Object.assign({ key: project.id }, project))}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);

  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确认删除',
      okText: '确定',
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'edit'} onClick={editProject(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  );
};
