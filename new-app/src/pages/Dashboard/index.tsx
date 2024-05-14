import NavbarPage from "./Navbar/Navbar";

type AppShellProps = {
  children: React.ReactNode;
};
const AppShell = (props: AppShellProps) => {
  const { children } = props;
  return (
    <div>
      <NavbarPage />
      {children}
    </div>
  );
};
export default AppShell;
