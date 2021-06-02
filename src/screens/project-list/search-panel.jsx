export const SearchPanel = ({ param, setParam, users }) => {
  return (
    <form>
      <div>
        {/* 输入框 */}
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        {/* 下拉选择框 */}
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};
