import { getLoggedUserId } from '../utils/getLoggedUserId';

describe('getLoggedUserId', () => {
    it('should return logged user id', () => {
        const expected = 1;

        expect(getLoggedUserId(undefined)).toEqual(expected);
    });
});
