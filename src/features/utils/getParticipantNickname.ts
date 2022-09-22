import { Conversation } from '../../types/conversation';

export const getParticipantNickname = (conversation: Conversation, userId: number): string => {
    const { recipientId, recipientNickname, senderId, senderNickname } = conversation;
    switch (true) {
        case userId === recipientId:
            return senderNickname;
        case userId === senderId:
            return recipientNickname;
        default:
            throw null;
    }
};
