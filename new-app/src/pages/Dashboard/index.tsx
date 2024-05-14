import FooterPage from "./Footer";
import HomeSite from "./Form";
import NavbarPage from "./Navbar";

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
    </div>
  );
};
export default Dashboard;
