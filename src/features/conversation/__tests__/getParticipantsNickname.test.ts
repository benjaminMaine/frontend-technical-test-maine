import { getParticipantNickname } from '../utils/getParticipantNickname';

describe('mockConversation', () => {
    test('1) it should return the recipient name if the user is the sender', () => {
        const expectedResult = getParticipantNickname(
            mockConversation,
            mockConversation.recipientId
        );
        expect(expectedResult).toBe(mockConversation.senderNickname);
    });
    test('2) it should return the recipient name if the user is the sender', () => {
        const expectedResult = getParticipantNickname(mockConversation, mockConversation.senderId);
        expect(expectedResult).toBe(mockConversation.recipientNickname);
    });
    test('3) it should return null if the user is neither the sender nor the recipient   ', () => {
        const expectedResult = getParticipantNickname(
            mockConversation,
            mockConversation.recipientId
        );
        expect(expectedResult).toBe(mockConversation.senderNickname);
    });
});

const mockConversation = {
    id: 2,
    recipientId: 3,
    recipientNickname: 'Patrick',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1620284667,
};
