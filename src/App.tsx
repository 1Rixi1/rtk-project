import "./App.css";
import { AppState, CounterId, store } from "../store.ts";
import { useEffect, useReducer, useRef } from "react";
import UsersList from "./users-list.tsx";

function App() {
  return (
    <>
      <div className="card">
        <Counter counterId="first" />
        <Counter counterId="second" />
        <br />
        <br />
        <br />
        <UsersList />
      </div>
    </>
  );
}

const selectCounter = (state: AppState, counterId: string) => {
  return state.counters[counterId];
};

const Counter = ({ counterId }: { counterId: CounterId }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const counterRef = useRef<ReturnType<typeof selectCounter>>(null);

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const currentCounter = selectCounter(store.getState(), counterId);

      const lastCounter = counterRef.current;

      if (currentCounter !== lastCounter) {
        forceUpdate();
      }

      counterRef.current = currentCounter;
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const counter = selectCounter(store.getState(), counterId);

  return (
    <>
      <p>{counter?.counter}</p>

      <button
        onClick={() =>
          store.dispatch({ type: "INCREMENT", payload: { counterId } })
        }
      >
        +
      </button>

      <button
        onClick={() =>
          store.dispatch({ type: "DECREMENT", payload: { counterId } })
        }
      >
        -
      </button>
    </>
  );
};

export default App;
