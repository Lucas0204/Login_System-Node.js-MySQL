const { describe, test, expect, jest: mock } = require('@jest/globals')
const deleteUserService = require('./deleteUserService')
const User = require('../../model/User')

describe('Delete user service test suite', () => {
    test('should delete a user', async () => {
        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(true)

        mock.spyOn(User, User.delete.name)
            .mockResolvedValue({})

        const res = await deleteUserService.execute(1)

        expect(User.getSingleUser).toHaveBeenCalled()
        expect(User.delete).toHaveBeenCalled()
        expect(res).toStrictEqual({ status: 'Deleted successfully!' })
    })

    test('should throw an exception of user is not found', async () => {
        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(false)

        mock.spyOn(User, User.delete.name)
            .mockResolvedValue({})

        let response;

        try {
            response = await deleteUserService.execute(1)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('User is not found!')
        }

        expect(response).toBe(undefined)
    })

    test('should throw an exception when deleting the user', async () => {
        mock.spyOn(User, User.getSingleUser.name)
            .mockResolvedValue(true)

        mock.spyOn(User, User.delete.name)
            .mockImplementation(() => {
                throw new Error('There was an error accessing database!')
            })

        let response;

        try {
            response = await deleteUserService.execute(1)
        } catch(err) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('There was an error accessing database!')
        }

        expect(response).toBe(undefined)
    })
})