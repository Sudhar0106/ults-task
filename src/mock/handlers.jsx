import { getApiUsers } from './getAPIs';
import { postApiAddUser } from './postAPIs';

export const MockData = [
  {
    "id": 1,
    "name": "Antony",
    "email": "antony@gmali.com",
    "password": "Antony@123",
    "conpassword": "Antony@123",
    "mobile": "98765432100",
    "date": "2024-11-30T18:30:00.000Z",
    "bio": "Hi there...",
    "gender": "male",
    "line1": "3392 Ruecker Expressway",
    "line2": "New Roscoe, ID 37910",
    "state": "Tamil Nadu",
    "country": "India"
  },
]

export const handlers = [getApiUsers(MockData), postApiAddUser(MockData)];