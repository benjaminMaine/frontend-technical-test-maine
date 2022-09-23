import React from 'react';
import { Conversation } from '../../../types/conversation';
import MobileChatDrawer from '../../chat/components/MobileChatDrawer';
import { useDisclosure } from '@chakra-ui/hooks';
import { ConversationCard } from './ConversationCard';
import { getParticipantNickname } from '../utils/getParticipantNickname';
import { useUserIdContext } from '../../../contexts/useUserIdContext';

type MobileConversationCardProps = {
    conversation: Conversation;
    selectedConversationId: Conversation['id'] | null;
    handleClickConversationCard: (id: Conversation['id'] | null) => void;
};
export const MobileConversationCard = ({
    conversation,
    selectedConversationId,
    handleClickConversationCard,
}: MobileConversationCardProps) => {
    const { user } = useUserIdContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClickMobileConversationCard = (id: Conversation['id']) => {
        onOpen();
        handleClickConversationCard(id);
    };

    const handleClose = () => {
        handleClickConversationCard(null);
        onClose();
    };
    const participants = getParticipantNickname(conversation, user.id);

    return (
        <>
            <MobileChatDrawer
                conversation={conversation}
                isOpen={isOpen}
                onClose={handleClose}
                title={participants}
            />
            <ConversationCard
                key={conversation.id}
                conversation={conversation}
                onClick={handleClickMobileConversationCard}
                isSelected={conversation.id === selectedConversationId}
            />
        </>
    );
};
