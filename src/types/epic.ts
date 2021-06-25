export interface Epic {
  id: number;
  name: string;
  projectId: number;
  // 开始时间 结束时间
  start: number;
  end: number;
}
