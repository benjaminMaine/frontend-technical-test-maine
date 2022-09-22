import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatLastMessageDate = (timeStamp: number): string => {
    const timeFromLastMessage = dayjs(timeStamp).toNow(true);
    return `${timeFromLastMessage} ago`;
};
