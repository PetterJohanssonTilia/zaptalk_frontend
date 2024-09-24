import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>Oops! This page doesn't exist!</h1>
            <Link to='/'>Click here to go back to the home page!</Link>
        </div>
    )
}