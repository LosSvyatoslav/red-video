import dayjs from "dayjs";
import relativeDate from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeDate)


export function transformDate (createdAt: string) {
return dayjs(createdAt).fromNow()
}