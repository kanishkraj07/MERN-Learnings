import { selector } from "recoil";
import { NotificationsAtom } from "../atoms/atoms";

export const ProfileUpdatesCountSelector = selector({
    key: "ProfileUpdatesCountSelector",
    get: ({get}) => {
        const notificationsCount = get(NotificationsAtom);
        return notificationsCount.jobs + notificationsCount.messaging + notificationsCount.network + notificationsCount.notifications;
    }
})