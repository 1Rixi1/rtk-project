import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./model/fetch-users.ts";
import { createSlice, ExtraArgumentType } from "../../shared/redux.ts";

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: "idle",
  fetchUserStatus: "idle",
  deleteUserStatus: "idle",
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
    selectUserById: (state, userId) => state.entities[userId],
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
    selectIsFetchUserPending: (state) => state.fetchUserStatus === "pending",
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === "pending",
  },
  reducers: (creators) => ({
    fetchUser: creators.asyncThunk<
      User,
      { userId: UserId },
      { extra: ExtraArgumentType }
    >(
      ({ userId }, thunkAPI) => {
        return thunkAPI.extra.api.getUser(userId);
      },
      {
        pending: (state) => {
          state.fetchUserStatus = "pending";
        },
        fulfilled: (state, action) => {
          state.fetchUserStatus = "success";
          const user = action.payload;
          state.entities[user.id] = user;
        },
        rejected: (state) => {
          state.fetchUserStatus = "error";
        },
      }
    ),

    deleteUserPending: creators.reducer((state) => {
      state.deleteUserStatus = "pending";
    }),
    deleteUserSuccess: creators.reducer(
      (state, action: PayloadAction<{ userId: UserId }>) => {
        state.deleteUserStatus = "success";
        const { userId } = action.payload;
        delete state.entities[userId];
      }
    ),
    deleteUserError: creators.reducer((state) => {
      state.deleteUserStatus = "error";
    }),
  }),

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchUsersStatus = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = "success";
      const users = action.payload;

      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);

      state.ids = users.map((user) => user.id);
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.fetchUsersStatus = "error";
    });
  },
});

//TYPE

type UsersState = {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  fetchUsersStatus: "idle" | "pending" | "success" | "error";
  fetchUserStatus: "idle" | "pending" | "success" | "error";
  deleteUserStatus: "idle" | "pending" | "success" | "error";
};

export type UserId = string;

export type User = {
  name: string;
  description: string;
  id: string;
};
