const { describe, test, expect, jest: mock } = require('@jest/globals')
const ListUsersService = require('./listUsersService')
const User = require('../../model/User')

describe('List users service test suite', () => {
    test('should list all users', async () => {
        const mockUsers = [
            {
              "id": 1,
              "name": "Test one",
              "email": "test@test1.com",
              "admin": false,
              "createdAt": "2021-09-27T16:07:51.000Z",
              "updatedAt": "2021-09-27T16:07:51.000Z"
            },
            {
              "id": 2,
              "name": "Test two",
              "email": "test@test2.com",
              "admin": false,
              "createdAt": "2021-09-27T16:07:51.000Z",
              "updatedAt": "2021-09-27T16:07:51.000Z"
            }
        ]

        mock.spyOn(User, User.getAllUsers.name)
            .mockResolvedValue(mockUsers)

        const listUsersService = new ListUsersService()
        const users = await listUsersService.execute()

        expect(User.getAllUsers).toHaveBeenCalled()
        expect(users).toStrictEqual(mockUsers)
    })

    test('should throw an exception of no users found', async () => {
        mock.spyOn(User, User.getAllUsers.name)
            .mockResolvedValue(false)

        let response;

        try {
            const listUsersService = new ListUsersService()
            response = await listUsersService.execute()
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Error! No users found!')
        }

        expect(response).toBeUndefined()
    })
})
