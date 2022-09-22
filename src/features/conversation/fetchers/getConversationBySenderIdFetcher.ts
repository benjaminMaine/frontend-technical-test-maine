import { baseURL } from '../../../constants/baseURL';
import { Conversation } from '../../../types/conversation';

export const getConversationBySenderIdFetcher = async (
    resource: string,
    senderId: number
): Promise<Conversation[]> => {
    const conversations: Conversation[] = await fetch(`${baseURL}/${resource}/${senderId}`).then(
        (res) => res.json()
    );
    return conversations;
};
