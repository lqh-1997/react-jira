import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

// 切片文件 专门用来管理reducer相关的状态
interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    // redux-toolkit 内置了一个immer依赖库
    // 能够使这种赋值操作在一个新的对象上面实现
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
