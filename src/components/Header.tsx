import { Avatar, chakra, Flex } from '@chakra-ui/react';
import useSWR from 'swr';
import Image from 'next/image';
import Logo from '../assets/lbc-logo.webp';

import { getUserByIdFetcher } from '../features/auth/fetchers/getUserByIdFetcher';
import { UseDisclosureProps } from '@chakra-ui/hooks';

type HeaderProps = Pick<UseDisclosureProps, 'onOpen'> & { userId: number | null };
const Header = ({ onOpen, userId }: HeaderProps) => {
    const { data } = useSWR(['users', userId], getUserByIdFetcher);

    return (
        <chakra.header
            borderBottom="1px"
            borderColor="gray.light"
            display="flex"
            justifyContent="space-between"
            my={4}
            px={4}
            pb={2}
        >
            <Image src={Logo} alt="Leboncoin Frontend Team" width={160} height={50} />
            <Avatar onClick={onOpen} name={data?.user?.nickname} />
        </chakra.header>
    );
};

export default Header;
