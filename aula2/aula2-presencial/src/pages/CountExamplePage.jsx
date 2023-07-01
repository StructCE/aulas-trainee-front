import { useState } from "react";
import PageWrapper from "./PageWrapper";

export default function CountExamplePage() {
  const [count, setCount] = useState(0);

  return (
    <PageWrapper>
      <button
        className="bg-sky-300 text-zinc-900 px-3 py-2 rounded text-lg"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </PageWrapper>
  );
}
