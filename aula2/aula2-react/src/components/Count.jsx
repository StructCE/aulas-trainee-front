import { useEffect, useState } from "react";

export function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count", count);
  }, [count]);

  function handleClick() {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);

    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <button
      className="m-10 bg-zinc-200 text-black py-2 px-3 rounded-sm"
      onClick={handleClick}
    >
      Click me! {count}
    </button>
  );
}
