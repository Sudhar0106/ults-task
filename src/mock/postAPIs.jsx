import { http, HttpResponse } from 'msw';

export const postApiAddUser = (users) =>
    http.post('http://localhost:3000/api/addUser', async ({ request }) => {
        
        const requestBody = await request.json();

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            createdAt: new Date().toString(),
            ...requestBody,
        };
        users?.push(newUser);
        return HttpResponse.json(
            {
                message: 'User Added Successfully',
                content: requestBody,
                createdAt: new Date().toLocaleString(),
            },
            { status: 201 },
        );
    });