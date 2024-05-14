import HomeSite from "./Form";
import NavbarPage from "./Navbar/Navbar";

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
    </div>
  );
};
export default Dashboard;
