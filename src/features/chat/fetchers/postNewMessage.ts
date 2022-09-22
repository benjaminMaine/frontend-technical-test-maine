// const { mutate } = useSWRConfig()

import { baseURL } from '../../../constants/baseURL';

type NewMessageDTO = {
    authorId: number;
    body: string;
    conversationId: number;
    timestamp: number;
};

export const postNewMessage = async (payload: Omit<NewMessageDTO, 'timestamp'>) => {
    const timestamp = new Date().getTime();
    const body: NewMessageDTO = {
        ...payload,
        timestamp,
    };
    const res = await fetch(`${baseURL}/messages/${payload.conversationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
    return res;
};
