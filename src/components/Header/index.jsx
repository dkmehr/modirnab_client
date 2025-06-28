import "./header.scss";
import HeaderCompanyLogo from "./components/logo";
import HeaderAction from "./components/action";

const Header = () => {
  return (
    <>
      <section className="header">
        <HeaderCompanyLogo />
        <HeaderAction />
      </section>
    </>
  );
};

export default Header;
