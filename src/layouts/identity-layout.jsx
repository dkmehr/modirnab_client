import { Outlet } from "react-router-dom";
import "./style.scss";

const IdentityLayout = () => {
  return (
    <section className="hero-identity-layout" style={{}}>
      {<Outlet />}
    </section>
  );
};

export default IdentityLayout;
