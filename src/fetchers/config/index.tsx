import { SWRConfig } from 'swr';
import { PropsWithChildren } from 'react';

const SWR_REFRESH_INTERVAL = 3000;

export const swrFetcher = (resource, init) => {
    return fetch(`http://localhost:3005${resource}`, init).then((res) => res.json());
};
const Index = ({ children }: PropsWithChildren) => {
    return (
        <SWRConfig
            value={{
                refreshInterval: SWR_REFRESH_INTERVAL,
                fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}
        >
            {children}
        </SWRConfig>
    );
};

export default Index;
