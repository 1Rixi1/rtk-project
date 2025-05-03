import { useAppDispatch, useAppSelector } from "../../store.ts";

import {
  CounterId,
  decrementAction,
  incrementAction,
} from "./counters.slice.ts";

import { selectCounter } from "./counters.slice.ts";

export const Counter = ({ counterId }: { counterId: CounterId }) => {
  const dispatch = useAppDispatch();

  const selectCurrentCounter = useAppSelector((state) =>
    selectCounter(state.counters, counterId),
  );

  const handleIncrement = () => {
    dispatch(decrementAction({ counterId }));
  };

  const handleDecrement = () => {
    dispatch(incrementAction({ counterId }));
  };

  return (
    <>
      <p>{selectCurrentCounter?.counter}</p>

      <button onClick={handleIncrement}>+</button>

      <button onClick={handleDecrement}>-</button>
    </>
  );
};
