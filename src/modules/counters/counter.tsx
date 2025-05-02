import { useAppDispatch, useAppSelector } from "../../store.ts";

import { CounterId } from "./counters.slice.ts";

import {
  DecrementAction,
  IncrementAction,
  selectCounter,
} from "./counters.slice.ts";

export const Counter = ({ counterId }: { counterId: CounterId }) => {
  const dispatch = useAppDispatch();

  const counter = useAppSelector((state) => selectCounter(state, counterId));

  const handleIncrement = () => {
    dispatch({
      type: "INCREMENT",
      payload: { counterId },
    } satisfies IncrementAction);
  };

  const handleDecrement = () => {
    dispatch({
      type: "DECREMENT",
      payload: { counterId },
    } satisfies DecrementAction);
  };

  return (
    <>
      <p>{counter?.counter}</p>

      <button onClick={handleIncrement}>+</button>

      <button onClick={handleDecrement}>-</button>
    </>
  );
};
