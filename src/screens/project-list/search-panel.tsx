/** @jsxImportSource @emotion/react */
import { Input } from 'antd';
import { Form } from 'antd';
import { UserSelect } from 'components/user-select';
import { Project } from './list';

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, 'name' | 'personId'>>;
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
        {/* 下拉选择框 这里的search-option直接通过组件的option传递过去了 */}
        <UserSelect
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
          defaultOptionName={'负责人'}
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
