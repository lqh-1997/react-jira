import { Button, Drawer } from 'antd';

export interface ProjectModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = (props: ProjectModalProps) => {
  return (
    <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'}>
      <h1>Projecct Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
