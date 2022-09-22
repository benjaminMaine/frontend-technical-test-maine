import { formatLastMessageDate } from '../utils/formatLastMessageDate';

const todayTimestamp = new Date().getTime();
const yesterdayTimestamp = new Date().setDate(new Date().getDate() - 1);
const lastMonthDate = new Date().setDate(new Date().getDate() - 30);

describe('mockConversation', () => {
    test('1) it should return the recipient name if the user is the sender', () => {
        const expectedResult = formatLastMessageDate(todayTimestamp);
        expect(expectedResult).toBe('a few seconds ago');
    });
    test('2) it should return the recipient name if the user is the sender', () => {
        const expectedResult = formatLastMessageDate(yesterdayTimestamp);
        expect(expectedResult).toBe('a day ago');
    });
    test('2) it should return ', () => {
        const expectedResult = formatLastMessageDate(lastMonthDate);
        expect(expectedResult).toBe('a month ago');
    });
});
