import { ChangeEventHandler, useEffect, useState } from 'react';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal';
import { UseDisclosureProps } from '@chakra-ui/hooks';
import { Button, Flex, Select, Stack } from '@chakra-ui/react';
import { isNumber, map } from 'lodash';
import { SelectOption } from '../../../types/selectOptions';
import useSWR from 'swr';
import { getUsersFetcher } from '../fetchers/getUsersFetcher';
import { useUserIdContext } from '../../../contexts/useUserIdContext';
import { UserId } from '../../../types/userId';

type ChangeUserModalProps = UseDisclosureProps & {
    handleChangeUser: (id: UserId) => void;
};
const ChangeUserModal = ({ handleChangeUser, isOpen, onClose, onOpen }: ChangeUserModalProps) => {
    const { user } = useUserIdContext();
    const [newSelectedUserId, setNewSelectedUserId] = useState<UserId>(
        isNumber(user?.id) ? user.id : null
    );
    useEffect(() => {
        if (!isNumber(newSelectedUserId)) {
            onOpen();
            return;
        }
    }, [onOpen, newSelectedUserId]);

    const { data: users } = useSWR('users', getUsersFetcher);
    const userOptions: SelectOption[] = map(users, ({ id, nickname }) => ({
        label: nickname,
        value: id,
    }));
    const handleChangeSelectedUser: ChangeEventHandler<HTMLSelectElement> = ({
        target: { value },
    }) => {
        isNumber(+value) && setNewSelectedUserId(+value);
    };
    const handleClickConfirmNewUser = () => {
        handleChangeUser(newSelectedUserId);
        onClose();
    };

    const handleClose = () => {
        setNewSelectedUserId(null);
        onClose();
    };

    return (
        <Modal
            closeOnOverlayClick={!!user}
            isCentered
            isOpen={isOpen}
            onClose={handleClose}
            size="lg"
        >
            <ModalOverlay />
            <ModalContent mx={4}>
                {user && <ModalCloseButton />}
                <ModalHeader as={Flex} justifyContent="center">
                    Please sign in
                </ModalHeader>
                <ModalBody as={Stack} justifyContent="center">
                    <Select onChange={handleChangeSelectedUser} placeholder="Select a user">
                        {map(userOptions, ({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </Select>
                    <Button
                        disabled={!isNumber(newSelectedUserId)}
                        onClick={handleClickConfirmNewUser}
                    >
                        Confirm
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ChangeUserModal;
