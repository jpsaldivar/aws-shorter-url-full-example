import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation isLoggedIn={props.isLoggedIn} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
