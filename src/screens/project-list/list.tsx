import { User } from './search-panel';
import { Dropdown, Menu, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
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
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'}>{props.projectButton}</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      // dataSource={list.map((project) => Object.assign({ key: project.id }, project))}
      {...props}
    ></Table>
  );
};
