import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerFooter,
} from '@chakra-ui/react';
import { UseDisclosureProps } from '@chakra-ui/hooks';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import { Conversation } from '../../../types/conversation';
import ChatFooter from './ChatFooter';

type MobileChatDrawerProps = UseDisclosureProps & {
    conversation: Conversation;
    title: string;
};
const MobileChatDrawer = ({ conversation, isOpen, onClose, title }: MobileChatDrawerProps) => {
    return (
        <Drawer isOpen={isOpen} onClose={onClose} isFullHeight size="full" placement="top">
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottom="1px" borderColor="gray.200" pr={10}>
                    <ChatHeader title={title} />
                </DrawerHeader>
                <DrawerBody>
                    <ChatMessages conversationId={conversation.id} title={title} />
                </DrawerBody>
                <DrawerFooter m={0} p={0}>
                    <ChatFooter conversationId={conversation.id} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default MobileChatDrawer;
