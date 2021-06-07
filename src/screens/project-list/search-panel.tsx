/** @jsxImportSource @emotion/react */
import { Input, Select } from 'antd';
import { Form } from 'antd';

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    // 要使用emotion行内样式 需要在头部加上注释 和 引入
    <Form layout={'inline'} style={{ marginBottom: '2rem' }}>
      <Form.Item>
        {/* 输入框 */}
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        {/* 下拉选择框 */}
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => {
            return (
              <Select.Option value={user.id} key={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
