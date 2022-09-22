import { Stack, useMediaQuery } from '@chakra-ui/react';
import { ConversationCard, ConversationCardWithRef } from '../components/ConversationCard';
import useSWR from 'swr';
import { conversationBySenderIdFetcher } from '../../fetchers/conversationBySenderIdFetcher';
import { map } from 'lodash';
import { Loader } from '../../components/Loader';
import { RESPONSIVE_MEDIA_QUERIES } from '../../constants/responsiveMediaQueries';
import Link from 'next/link';

type ConversationListProps = {
    userId: number | null;
};
const ConversationList = ({ userId }: ConversationListProps) => {
    const { isValidating, data: conversations } = useSWR(
        ['conversations', userId],
        conversationBySenderIdFetcher
    );
    const [isMobile] = useMediaQuery(RESPONSIVE_MEDIA_QUERIES.IS_MOBILE);
    return (
        <Stack spacing={3} flex={1}>
            {isValidating ? (
                <Loader />
            ) : (
                map(conversations, (conversation) =>
                    isMobile ? (
                        <Link
                            key={conversation.id}
                            href={{
                                pathname: '/conversation/[slug]',
                                query: { slug: conversation.id },
                            }}
                            passHref
                        >
                            <ConversationCardWithRef
                                key={conversation.id}
                                conversation={conversation}
                                userId={userId}
                            />
                        </Link>
                    ) : (
                        <ConversationCard
                            key={conversation.id}
                            conversation={conversation}
                            userId={userId}
                        />
                    )
                )
            )}
        </Stack>
    );
};

export default ConversationList;
