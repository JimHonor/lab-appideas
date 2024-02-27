import { Link } from "react-router-dom";

export default function Home() {
  const routes = ["timeline", "blogideas"];

  return (
    <ul>
      {routes.map((r) => (
        <li key={r}>
          <Link to={r}>{r}</Link>
        </li>
      ))}
    </ul>
  );
}
