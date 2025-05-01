import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialCounter: Counter = {
  counter: 0,
};

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

const initialState: State = {
  counters: {},
  users: initialUsersState,
};

function reducer(state = initialState, action: ActionType): State {
  switch (action.type) {
    case "INCREMENT": {
      const { counterId } = action.payload;

      const currentCounter = state.counters[counterId] || initialCounter;

      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        },
      };
    }

    case "DECREMENT": {
      const { counterId } = action.payload;

      const currentCounter = state.counters[counterId] || initialCounter;

      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        },
      };
    }

    case "STORAGE_USER": {
      const { users } = action.payload;

      return {
        ...state,
        users: {
          ...state.users,
          entities: users.reduce(
            (acc, user) => {
              acc[user.id] = user;
              return acc;
            },
            {} as Record<UserId, User>,
          ),
          ids: users.map((user) => user.id),
        },
      };
    }

    case "SELECTED_USER": {
      const { userId } = action.payload;

      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: userId,
        },
      };
    }

    case "REMOVE_SELECTED_USER": {
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: undefined,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export const store = configureStore({
  reducer: reducer,
});

//TYPE
type State = {
  counters: Record<CounterId, Counter | undefined>;
  users: UsersState;
};

//COUNTER

type Counter = {
  counter: number;
};

export type CounterId = string;

//USERS

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

export type UserId = string;

export type User = {
  name: string;
  description: string;
  id: string;
};

//ACTIONS
type ActionType =
  | IncrementAction
  | DecrementAction
  | StorageUserAction
  | SelectedUserAction
  | RemoveSelectedUserAction;

//COUNTER-ACTIONS

type IncrementAction = {
  type: "INCREMENT";
  payload: { counterId: string };
};

type DecrementAction = {
  type: "DECREMENT";
  payload: { counterId: string };
};

//USERS-ACTIONS

type StorageUserAction = {
  type: "STORAGE_USER";
  payload: {
    users: User[];
  };
};

type SelectedUserAction = {
  type: "SELECTED_USER";
  payload: {
    userId: UserId;
  };
};

type RemoveSelectedUserAction = {
  type: "REMOVE_SELECTED_USER";
};

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<AppState>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const createAppSelector = createSelector.withTypes<AppState>();

//DATA

const users = Array.from({ length: 3000 }, (_, idx) => {
  return {
    id: `user${idx + 11}`,
    name: `user ${idx + 11}`,
    description: `user ${idx + 11}`,
  } as User;
});

store.dispatch({
  type: "STORAGE_USER",
  payload: { users },
} satisfies StorageUserAction);
