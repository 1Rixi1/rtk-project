import {AppState} from "../../store.ts";

const initialCountersState: CounterState = {};

const initialCounter: Counter = {
    counter: 0,
};


//REDUCER
export function CountersReducer(state = initialCountersState, action: ActionsType) {
  switch (action.type) {
    case "INCREMENT": {
      const { counterId } = action.payload;

      const currentCounter = state[counterId] || initialCounter;

      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    }

    case "DECREMENT": {
      const { counterId } = action.payload;

      const currentCounter = state[counterId] || initialCounter;

      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1,
        },
      };
    }

    default: {
      return state;
    }
  }
}

//ACTIONS
type ActionsType = IncrementAction | DecrementAction;


export type IncrementAction = {
    type: "INCREMENT";
    payload: { counterId: string };
};

export type DecrementAction = {
    type: "DECREMENT";
    payload: { counterId: string };
};


//TYPE

type CounterState = Record<CounterId, Counter | undefined>;

type Counter = {
  counter: number;
};

export type CounterId = string;


//SELECTORS

export const selectCounter = (state: AppState, counterId: string) => {
  return state.counters[counterId];
};