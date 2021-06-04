// 测试写一下useArray 无用的文件
import { useMount, useArray } from 'utils';

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: 'jack', age: 25 },
    { name: 'ma', age: 22 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {});

  return (
    <div>
      <button onClick={() => add({ name: 'john', age: 22 })}>add</button>
      <button onClick={() => removeIndex(0)}>remove 0 </button>
      <button onClick={() => clear()}>clear</button>

      {value.map((person, index) => (
        <div key={index}>
          <span>{index}</span>--
          <span>{person.name}</span>--
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
