import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
const url = import.meta.env.VITE_URL;
const SingleCard = ({ abstract, title, imageUrl }) => {
  return (
    <section className="hero-notifications__card-single">
      <section className="hero-learning__single-card__icon">
        <img src={`${url}${imageUrl}`} alt="Notification" />
      </section>
      <section className="hero-notifications__card-single__content">
        <section className="title">{title}</section>
        <Divider />
        <section className="detail-information">
          <p className="content">{abstract.substring(0, 380)}</p>
        </section>
        <section className="wrapper-action-more">
          {/* <Button className="show-more">بیشتر بدانید</Button> */}
        </section>
      </section>
    </section>
  );
};

export default SingleCard;
