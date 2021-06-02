import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject } from "utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // 这个是当前选择的人物信息
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // 这个是可选择的用户列表
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
