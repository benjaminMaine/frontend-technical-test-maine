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
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SelectOption } from '../types/selectOptions';
import useSWR from 'swr';
import { getUsersFetcher } from '../features/auth/fetchers/getUsersFetcher';
import { getUserByIdFetcher } from '../features/auth/fetchers/getUserByIdFetcher';

type ChangeUserModalProps = UseDisclosureProps & {
    handleChangeUser: (id: number) => void;
    userId: number | null;
};
const ChangeUserModal = ({
    handleChangeUser,
    isOpen,
    onClose,
    onOpen,
    userId,
}: ChangeUserModalProps) => {
    const { isValidating, data } = useSWR(['users', userId], getUserByIdFetcher);
    const [newSelectedUser, setNewSelectedUser] = useState<number | null>(null);
    useEffect(() => {
        if (!isNumber(userId)) {
            onOpen();
        }
    }, [userId]);

    const { data: users } = useSWR('users', getUsersFetcher);
    const userOptions: SelectOption[] = map(users, ({ id, nickname }) => ({
        label: nickname,
        value: id,
    }));
    const handleChangeSelectedUser: ChangeEventHandler<HTMLSelectElement> = ({
        target: { value },
    }) => {
        isNumber(+value) && setNewSelectedUser(+value);
    };
    const handleClickConfirmNewUser = () => {
        handleChangeUser(newSelectedUser);
        handleClose();
    };

    const handleClose = () => {
        setNewSelectedUser(null);
        onClose();
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={handleClose} size="lg">
            <ModalOverlay />
            <ModalContent mx={4}>
                {data?.isLogged && <ModalCloseButton />}
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
                        disabled={!isNumber(newSelectedUser)}
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
