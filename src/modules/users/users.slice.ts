import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

//REDUCER

export const usersReducer = createSlice({
  name: "users",
  initialState: initialUsersState,
  selectors: {
    selectUserId: (state) => state.selectedUserId,
    selectSortedUsers: createSelector(
      (state: UsersState) => state.entities,
      (state: UsersState) => state.ids,
      (_: UsersState, sortType: "asc" | "desc") => sortType,
      (entities, ids, sortType) =>
        ids
          .map((id) => entities[id])
          .filter((user) => user !== undefined)
          .sort((a, b) => {
            if (sortType === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          }),
    ),
  },
  reducers: {
    storage: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;

      state.entities = users.reduce(
        (acc, user) => {
          acc[user.id] = user;

          return acc;
        },
        {} as Record<UserId, User>,
      );

      state.ids = users.map((user) => user.id);
    },
    select: (state, action: PayloadAction<{ userId: UserId }>) => {
      const { userId } = action.payload;

      state.selectedUserId = userId;
    },
    removeSelect: (state) => {
      state.selectedUserId = undefined;
    },
  },
});

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

//DATA
export const usersList = Array.from({ length: 3000 }, (_, idx) => {
  return {
    id: `user${idx + 11}`,
    name: `user ${idx + 11}`,
    description: `user ${idx + 11}`,
  } as User;
});
