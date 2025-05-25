import { useAppDispatch, useAppSelector } from "../../shared/redux.ts";

import {
  CounterId,
  decrementAction,
  incrementAction,
  selectCounter,
} from "./counters.slice.ts";

export const Counter = ({ counterId }: { counterId: CounterId }) => {
  const dispatch = useAppDispatch();

  const selectCurrentCounter = useAppSelector((state) =>
    selectCounter(state.counters, counterId)
  );

  const handleIncrement = () => {
    dispatch(incrementAction({ counterId }));
  };

  const handleDecrement = () => {
    dispatch(decrementAction({ counterId }));
  };

  return (
    <>
      <p>{selectCurrentCounter?.counter}</p>

      <button onClick={handleIncrement}>+</button>

      <button onClick={handleDecrement}>-</button>
    </>
  );
};
