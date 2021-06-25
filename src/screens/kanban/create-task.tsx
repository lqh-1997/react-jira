import { Card, Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAddTask } from 'utils/task';
import { useProjectIdInUrl, useTasksQueryKey } from './utils';

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('');
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName('');
  };
  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName('');
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  } else {
    return (
      <Card>
        <Input
          onBlur={toggle}
          placeholder="需要做些什么"
          autoFocus={true}
          onPressEnter={submit}
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        ></Input>
      </Card>
    );
  }
};