import { http, HttpResponse } from "msw";

export const getApiUsers = (users) =>
    http.get("http://localhost:3000/api/users", () => {
        return HttpResponse.json(users);
    });