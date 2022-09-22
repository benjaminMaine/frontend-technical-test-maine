import { Avatar, chakra, Flex } from '@chakra-ui/react';
import useSWR from 'swr';
// import Logo from '../assets/lbc-logo.webp';

import { userByIdFetcher } from '../fetchers/userByIdFetcher';
import { UseDisclosureProps } from '@chakra-ui/hooks';

type HeaderProps = Pick<UseDisclosureProps, 'onOpen'> & { userId: number | null };
const Header = ({ onOpen, userId }: HeaderProps) => {
    const { data } = useSWR(['users', userId], userByIdFetcher);

    return (
        <chakra.header display="flex" justifyContent="space-between" m={4}>
            {/*<Image src={Logo} alt="Leboncoin Frontend Team" width={160} height={50} />*/}
            <Flex />
            <Avatar onClick={onOpen} name={data?.user?.nickname} />
        </chakra.header>
    );
};

export default Header;
