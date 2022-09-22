import { Stack, useMediaQuery } from '@chakra-ui/react';
import { ConversationCard, ConversationCardWithRef } from './ConversationCard';
import { map } from 'lodash';
import { Loader } from '../../../components/Loader';
import { RESPONSIVE_MEDIA_QUERIES } from '../../../constants/responsiveMediaQueries';
import Link from 'next/link';
import { Conversation } from '../../../types/conversation';
import React, { MouseEventHandler } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import MobileChatDrawer from '../../chat/components/MobileChatDrawer';
import { MobileConversationCard } from './MobileConversationCard';

type ConversationListProps = {
    conversations: Conversation[];
    isLoading: boolean;
    selectedConversationId: number | null;
    setSelectedConversationId: React.Dispatch<number | null>;
    userId: number | null;
};
const ConversationList = ({
    conversations,
    isLoading,
    selectedConversationId,
    setSelectedConversationId,
    userId,
}: ConversationListProps) => {
    const [isMobile] = useMediaQuery(RESPONSIVE_MEDIA_QUERIES.IS_MOBILE);

    const handleClickConversationCard =
        (id: number): MouseEventHandler<HTMLDivElement> =>
        () => {
            setSelectedConversationId(id);
        };

    return (
        <Stack spacing={3} flex={1} overflowY="auto">
            {isLoading ? (
                <Loader />
            ) : (
                map(conversations, (conversation) =>
                    isMobile ? (
                        <MobileConversationCard
                            conversation={conversation}
                            selectedConversationId={selectedConversationId}
                            setSelectedConversationId={setSelectedConversationId}
                            userId={userId}
                        />
                    ) : (
                        <ConversationCard
                            key={conversation.id}
                            conversation={conversation}
                            isSelected={conversation.id === selectedConversationId}
                            onClick={handleClickConversationCard(conversation.id)}
                            userId={userId}
                        />
                    )
                )
            )}
        </Stack>
    );
};

export default ConversationList;
