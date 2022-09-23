import React from 'react';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { ConversationCard } from './ConversationCard';
import { map } from 'lodash';
import { Loader } from '../../../components/Loader';
import { RESPONSIVE_MEDIA_QUERIES } from '../../../constants/responsiveMediaQueries';
import { Conversation } from '../../../types/conversation';
import { MobileConversationCard } from './MobileConversationCard';

type ConversationListProps = {
    conversations: Conversation[];
    handleClickConversationCard: (id: Conversation['id']) => void;
    isLoading: boolean;
    selectedConversationId: Conversation['id'] | null;
};
const ConversationList = ({
    conversations,
    handleClickConversationCard,
    isLoading,
    selectedConversationId,
}: ConversationListProps) => {
    const [isMobile] = useMediaQuery(RESPONSIVE_MEDIA_QUERIES.IS_MOBILE);

    return (
        <Stack data-testid="conversation-list" spacing={3} flex={1} overflowY="auto">
            {isLoading ? (
                <Loader />
            ) : (
                map(conversations, (conversation) =>
                    isMobile ? (
                        <MobileConversationCard
                            conversation={conversation}
                            handleClickConversationCard={handleClickConversationCard}
                            key={conversation.id}
                            selectedConversationId={selectedConversationId}
                        />
                    ) : (
                        <ConversationCard
                            conversation={conversation}
                            onClick={handleClickConversationCard}
                            key={conversation.id}
                            isSelected={conversation.id === selectedConversationId}
                        />
                    )
                )
            )}
        </Stack>
    );
};

export default ConversationList;
