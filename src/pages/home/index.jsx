import "./index.scss";
import { Message } from "@/libs/utils/message.js";
import RegisterOrder from "./components/registerOrder";
import { listAdvertise } from "@services/globalService.js";
import { useEffect, useState } from "react";
import Slider from "./components/slider";
const Home = () => {
  const [advertisment, setAdvertisment] = useState([]);
  const getAdvertisment = async () => {
    try {
      const response = await listAdvertise();
      setAdvertisment(response.data.filter);
    } catch {
      //Message("error", "خطایی در دریافت اطلاعات رخ داده است");
    }
  };
  useEffect(() => {
    getAdvertisment();
  }, []);
  return (
    <>
      <section className="hero-home">
        <Slider data={advertisment} />
        <RegisterOrder />
      </section>
    </>
  );
};

export default Home;
