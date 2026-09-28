import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import CallAction from "./CallAction";
import Category from "./Category";
import PetFoodExtra from "./PetFoodExtra";
import DonateSection from "./DonateSection";
import AboutUs from "./AboutUs";
import Education from "./Education";



const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Paw | Home</title>
            </Helmet>
            <Banner></Banner>
            <CallAction></CallAction>
            <Category></Category>
            <PetFoodExtra></PetFoodExtra>
            <DonateSection></DonateSection>
            <AboutUs></AboutUs>
            <Education></Education>
        </div>
    );
};

export default Home;