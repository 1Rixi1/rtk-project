const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

//REDUCER
export function UsersReducer(state = initialUsersState, action: ActionsType) {
  switch (action.type) {
    case "STORAGE_USER": {
      const { users } = action.payload;

      return {
        ...state,
        entities: users.reduce(
          (acc, user) => {
            acc[user.id] = user;
            return acc;
          },
          {} as Record<UserId, User>,
        ),
        ids: users.map((user) => user.id),
      };
    }

    case "SELECTED_USER": {
      const { userId } = action.payload;

      return {
        ...state,
        selectedUserId: userId,
      };
    }

    case "REMOVE_SELECTED_USER": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }

    default: {
      return state;
    }
  }
}

//TYPE

type UsersState = {
  entities: Record<UserId, User | undefined>;
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
type ActionsType =
  | StorageUserAction
  | SelectedUserAction
  | RemoveSelectedUserAction;

export type StorageUserAction = {
  type: "STORAGE_USER";
  payload: {
    users: User[];
  };
};

export type SelectedUserAction = {
  type: "SELECTED_USER";
  payload: {
    userId: UserId;
  };
};

export type RemoveSelectedUserAction = {
  type: "REMOVE_SELECTED_USER";
};

//DATA
export const usersList = Array.from({ length: 3000 }, (_, idx) => {
  return {
    id: `user${idx + 11}`,
    name: `user ${idx + 11}`,
    description: `user ${idx + 11}`,
  } as User;
});
