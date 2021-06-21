import styled from '@emotion/styled';
import { Button, Drawer, Form, Input, Spin } from 'antd';
import useForm from 'antd/lib/form/hooks/useForm';
import { ErrorBox } from 'components/lib';
import { UserSelect } from 'components/user-select';
import { useEffect } from 'react';
import { useAddProject, useEditProject } from 'utils/project';
import { useProjectsQueryKey, useProjectModal } from './util';

export const ProjectModal = () => {
  const { close, projectModalOpen, editingProject, isLoading } = useProjectModal();
  // 和工程有关的异步操作 解构出来以一个异步操作 一个错误提示 一个loading信息
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      closeModel();
    });
  };

  const title = editingProject ? '编辑项目' : '创建项目';
  const closeModel = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer forceRender={true} onClose={closeModel} visible={projectModalOpen} width={'100%'}>
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error}></ErrorBox>
            <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入项目名称' }]}>
                <Input placeholder={'请输入项目名称'}></Input>
              </Form.Item>
              <Form.Item label={'部门'} name={'organization'} rules={[{ required: true, message: '请输入部门名称' }]}>
                <Input placeholder={'请输入部门名称'}></Input>
              </Form.Item>
              <Form.Item label={'负责人'} name={'personId'}>
                <UserSelect defaultOptionName={'负责人'}></UserSelect>
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
