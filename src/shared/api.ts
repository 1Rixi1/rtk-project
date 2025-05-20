import { z } from "zod";

const baseUrl = "http://localhost:3000";

const UsersSchemaDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const api = {
  getUsers: () => {
    return fetch(`${baseUrl}/users`).then((res) =>
      res.json().then((res) => UsersSchemaDto.array().parse(res))
    );
  },

  getUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`).then((res) =>
      res.json().then((res) => UsersSchemaDto.parse(res))
    );
  },

  deleteUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`, { method: "DELETE" }).then(
      (res) => res.json()
    );
  },
};
