import FooterPage from "./Footer";
import HomeSite from "./Form";
import NavbarPage from "./Navbar";
import Home from "./Pokemon";

type AppShellProps = {
  children: React.ReactNode;
};
const Dashboard = (props: AppShellProps) => {
  const { children } = props;
  return (
    <div>
      <NavbarPage />
      {children}
      <HomeSite />
      <FooterPage />
      {/* <Home /> */}
    </div>
  );
};
export default Dashboard;
