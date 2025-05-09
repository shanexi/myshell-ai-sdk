import { PropsWithChildren, useState } from 'react';

export default function Counter({
  children,
  initial = 0,
  id = '',
}: PropsWithChildren<{
  initial?: number;
  id?: string;
}>) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(count + 1);
  return (
    <div id={id}>
      <span>Count: {count}</span>
      <button onClick={increment}>Increment</button>
      {children}
    </div>
  );
}
