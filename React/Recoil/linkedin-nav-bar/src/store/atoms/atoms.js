import axios from "axios";
import { atom, selector } from "recoil";

export const NotificationsAtom = atom({
    key:"NotificationsAtom",
    default:  selector({
        key: "NotificationsAtomSelector",
        get: async() => {
          const resp = await axios.get("https://sum-server.100xdevs.com/notifications");
          return resp.data;
        }
    })
})