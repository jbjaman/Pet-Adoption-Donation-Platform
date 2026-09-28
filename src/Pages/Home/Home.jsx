import { Helmet } from "react-helmet-async";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import CallAction from "./CallAction";
import Category from "./Category";
import DonateSection from "./DonateSection";
import Education from "./Education";
import PetFoodExtra from "./PetFoodExtra";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Paw | Home</title>
      </Helmet>

      <Banner />
      <CallAction />
      <Category />
      <PetFoodExtra />
      <DonateSection />
      <AboutUs />
      <Education />
    </div>
  );
};

export default Home;
