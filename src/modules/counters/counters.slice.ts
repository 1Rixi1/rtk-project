import { createAction, createReducer } from "@reduxjs/toolkit";

const initialCountersState: CounterState = {};

const initialCounter: Counter = {
  counter: 0,
};

//ACTIONS

export const incrementAction = createAction<{ counterId: CounterId }>(
  "counters/increment",
);
export const decrementAction = createAction<{ counterId: CounterId }>(
  "counters/decrement",
);

//REDUCER

export const countersReducer = createReducer(
  initialCountersState,
  (builder) => {
    builder.addCase(incrementAction, (state, action) => {
      const { counterId } = action.payload;

      if (!state[counterId]) {
        state[counterId] = { ...initialCounter };
      }

      state[counterId].counter++;
    });
    builder.addCase(decrementAction, (state, action) => {
      const { counterId } = action.payload;

      if (!state[counterId]) {
        state[counterId] = { ...initialCounter };
      }

      state[counterId].counter--;
    });
  },
);

//TYPE

type CounterState = Record<CounterId, Counter | undefined>;

type Counter = {
  counter: number;
};

export type CounterId = string;

//SELECTORS

export const selectCounter = (state: CounterState, counterId: string) => {
  return state[counterId];
};
