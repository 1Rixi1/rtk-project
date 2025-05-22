import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: "idle",
};

//REDUCER

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  selectors: {
    selectSortedUsers: createSelector(
      (state: UsersState) => state.entities,
      (state: UsersState) => state.ids,
      (_: UsersState, sortType: "asc" | "desc") => sortType,
      (entities, ids, sortType) =>
        ids
          .map((id) => entities[id])
          .filter((user): user is User => !!user)
          .sort((a, b) => {
            if (sortType === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
    ),
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
    selectUserById: (state, userId) => state.entities[userId],
  },
  reducers: {
    fetchUsersPending: (state) => {
      state.fetchUsersStatus = "pending";
    },
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;
      state.fetchUsersStatus = "success";

      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user;

        return acc;
      }, {} as Record<UserId, User>);

      state.ids = users.map((user) => user.id);
    },
    fetchUsersError: (state) => {
      state.fetchUsersStatus = "error";
    },
  },
});

//TYPE

type UsersState = {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  fetchUsersStatus: "idle" | "pending" | "success" | "error";
};

export type UserId = string;

export type User = {
  name: string;
  description: string;
  id: string;
};
