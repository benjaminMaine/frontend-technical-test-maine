import { Button, HStack, Input } from '@chakra-ui/react';
import { useSWRConfig } from 'swr';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { postNewMessage } from '../fetchers/postNewMessage';

type ChatFooterProps = {
    conversationId: number;
    userId: number;
};
const ChatFooter = ({ conversationId, userId }: ChatFooterProps) => {
    const [message, setMessage] = useState('');
    const { mutate } = useSWRConfig();
    const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setMessage(value);
    };

    const handleClickSendMessage: MouseEventHandler<HTMLButtonElement> = () => {
        mutate(['messages', conversationId], () => {
            const payload = {
                authorId: userId,
                body: message,
                conversationId,
            };
            postNewMessage(payload);
            setMessage('');
        });
    };
    return (
        <HStack
            borderTop="1px"
            borderColor="gray.200"
            flex={{ base: 1, lg: 0 }}
            p={3}
            justifyContent="space-between"
        >
            <Input placeholder="Aa" value={message} onChange={handleChangeMessage} />
            <Button onClick={handleClickSendMessage}>Send</Button>
        </HStack>
    );
};

export default ChatFooter;
