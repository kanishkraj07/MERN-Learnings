import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    function goToRoute(path) {
        navigate(`${path}`)
    }

    return <div style={{padding: 15, background: "blue", color: "white", display: "flex", gap: 10}}>
    <a onClick={() => goToRoute("/dashboard")}>Dasboard</a>
    <a onClick={() => goToRoute("/")}>Landing</a>
    </div>
}