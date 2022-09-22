import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

// Default way to get a logged user

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
