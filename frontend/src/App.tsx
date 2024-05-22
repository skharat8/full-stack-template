import { useState } from "react";
import reactLogo from "@images/react.svg";
import viteLogo from "@images/vite.svg";
import "./App.css";

export default function App({ title }: AppProps) {
  const [count, setCount] = useState(0);
  // const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{title}</h1>
      <div className="card">
        <button
          type="button"
          onClick={() => setCount(prevCount => prevCount + 1)}
        >
          count {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

type AppProps = {
  title?: string;
};

App.defaultProps = {
  title: "React + Vite",
};

// type ContextType = { user: User | null };
// Use with: <Outlet context={{ user } satisfies ContextType} />

// export function useUser() {
//   return useOutletContext<ContextType>();
// }
