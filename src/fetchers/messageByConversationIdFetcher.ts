import { baseURL } from '../constants/baseURL';
import { Message } from '../types/message';

export const messageByConversationIdFetcher = async (
    resource: string,
    senderId: number
): Promise<Message[]> => {
    const messages: Message[] = await fetch(`${baseURL}/${resource}/${senderId}`).then((res) =>
        res.json()
    );

    return messages;
};
