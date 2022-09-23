import { baseURL } from '../../../constants/baseURL';
import { Message } from '../../../types/message';

type NewMessageDTO = Omit<Message, 'id'>;

export const postNewMessage = async (payload: NewMessageDTO) => {
    const body: NewMessageDTO = {
        ...payload,
    };
    const result = await fetch(`${baseURL}/messages/${payload.conversationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
    return result;
};
