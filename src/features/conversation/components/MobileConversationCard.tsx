import { Conversation } from '../../../types/conversation';
import React, { MouseEventHandler } from 'react';
import MobileChatDrawer from '../../chat/components/MobileChatDrawer';
import { useDisclosure } from '@chakra-ui/hooks';
import { ConversationCard } from './ConversationCard';
import { getParticipantNickname } from '../utils/getParticipantNickname';

type MobileConversationCardProps = {
    conversation: Conversation;
    selectedConversationId: number | null;
    setSelectedConversationId: React.Dispatch<number | null>;
    userId: number | null;
};
export const MobileConversationCard = ({
    conversation,
    selectedConversationId,
    setSelectedConversationId,
    userId,
}: MobileConversationCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClickMobileConversationCard =
        (id: number): MouseEventHandler<HTMLDivElement> =>
        () => {
            onOpen();
            setSelectedConversationId(id);
        };

    const handleClose = () => {
        setSelectedConversationId(null);
        onClose();
    };
    const participants = getParticipantNickname(conversation, userId);

    return (
        <>
            <MobileChatDrawer
                conversation={conversation}
                isOpen={isOpen}
                onClose={handleClose}
                title={participants}
                userId={userId}
            />
            <ConversationCard
                key={conversation.id}
                conversation={conversation}
                isSelected={conversation.id === selectedConversationId}
                onClick={handleClickMobileConversationCard(conversation.id)}
                userId={userId}
            />
        </>
    );
};
