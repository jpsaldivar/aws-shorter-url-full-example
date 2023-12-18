import classes from "./MainNavigation.module.css";
import Link from "next/link";
function MainNavigation(props) {
  let button;
  if (props.isLoggedIn) {
    button = <><li>
      <Link href="/user">User</Link>
    </li><li>
        <Link href="/logout">Logout</Link>
      </li></>;
  } else {
    button = <li>
    <Link href="/login">Login</Link>
    </li>;
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {button}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
