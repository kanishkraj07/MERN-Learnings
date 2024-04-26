 import { RecoilRoot, useRecoilValue } from "recoil";
import "./App.css";
import { NotificationsAtom } from "./store/atoms/atoms";
import { ProfileUpdatesCountSelector } from "./store/selectors/ProfileUpdatesCountSelector";

export default function App() {


    return <div className="linkedin">
        <RecoilRoot>
        <NavBar></NavBar>
        </RecoilRoot>
    </div>
    }


    function NavBar() {
        const notificationsCount = useRecoilValue(NotificationsAtom);
        const profileUpdatesCount = useRecoilValue(ProfileUpdatesCountSelector);

        return <div className="nav-bar">
        <button>Home</button>
        <button>My Network ({notificationsCount?.network})</button>
        <button>Messaging ({notificationsCount?.messaging})</button>
        <button>Notifications ({notificationsCount?.notifications})</button>
        <button>Jobs ({notificationsCount?.jobs})</button>
        <button>Me ({profileUpdatesCount})</button>
        </div>
    }