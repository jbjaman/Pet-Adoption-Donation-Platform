import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PetListing from "../Pages/PetListing/PetListing";
import DonationCamp from "../Pages/DonationCamp/DonationCamp";
import DashBoard from "../Layout/DashBoard";
import AddPet from "../Pages/AddPet/AddPet";
import MyPets from "../Pages/MyPets/MyPets";
import MyDonation from "../Pages/MyDonation/MyDonation";
import MyCampaigns from "../Pages/MyCampaigns/MyCampaigns";
import CreateCampaign from "../Pages/CreateCampaign/CreateCampaign";
import AdoptionReq from "../Pages/AdoptionReq/AdoptionReq";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AllPets from "../Pages/AllPets/AllPets";
import AllDonation from "../Pages/AllDonation/AllDonation";
import SiteError from "../Pages/ErrorPage/siteError";
import PetDetails from "../Pages/PetListing/PetDetails";
import DonationCampDetails from "../Pages/DonationCamp/DonationCampDetails";
import UpdateMyPets from "../Pages/MyPets/UpdateMyPets";
import UpdateMyCampaigns from "../Pages/MyCampaigns/UpdateMyCampaigns";
import EducationalWorkshop from "../Pages/EducationalWorkshop/EducationalWorkshop";
import CreateCourse from "../Pages/CreateCourse/CreateCourse";
import MyCourses from "../Pages/MyCourses/MyCourses";
import EnrolledCourses from "../Pages/EnrolledCourses/EnrolledCourses";
import AllCourses from "../Pages/AllCourses/AllCourses";
import UpdateMyCourses from "../Pages/MyCourses/UpdateMyCourses";
import EducationalWorkshopDetails from "../Pages/EducationalWorkshop/EducationalWorkshopDetails";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <SiteError></SiteError>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "petlist",
                element: <PetListing></PetListing>
            },
            {
                path: "petdetails/:id",
                element: <PetDetails></PetDetails>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-one.vercel.app/pets/${params.id}`)

            },
            {
                path: "dtncamp",
                element: <DonationCamp></DonationCamp>
            },
            {
                path: "dtncampdetails/:id",
                element: <DonationCampDetails></DonationCampDetails>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-one.vercel.app/donations/${params.id}`)
            },
            {
                path: "education",
                element: <EducationalWorkshop></EducationalWorkshop>
            },
            {
                path: "education/:id",
                element: <EducationalWorkshopDetails></EducationalWorkshopDetails>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-one.vercel.app/courses/${params.id}`)
            },
            {
                path: "login",
                element: <Login></Login>,
                loader: () => fetch('https://pet-adoption-server-one.vercel.app/users')
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashBoard></DashBoard>,
        loader: () => fetch('https://pet-adoption-server-one.vercel.app/users'),
        // <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            //all user routes
            {
                path: 'addpet',
                element: <AddPet></AddPet>
            },
            {
                path: 'mypets',
                element: <MyPets></MyPets>
            },
            {
                path: 'updatemypets/:id',
                element: <UpdateMyPets></UpdateMyPets>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-one.vercel.app/pets/${params.id}`)
            },
            {
                path: 'mydonation',
                element: <MyDonation></MyDonation>
            },

            {
                path: 'mycampaigns',
                element: <MyCampaigns></MyCampaigns>
            },
            {
                path: 'updatemycampaigns/:id',
                element: <UpdateMyCampaigns></UpdateMyCampaigns>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-one.vercel.app/donations/${params.id}`)
            },
            {
                path: 'createcampaign',
                element: <CreateCampaign></CreateCampaign>
            },
            {
                path: 'adoptionreq',
                element: <AdoptionReq></AdoptionReq>
            },
            {
                path: 'createcourse',
                element: <CreateCourse></CreateCourse>
            },
            {
                path: 'mycourses',
                element: <MyCourses></MyCourses>
            },
            {
                path: 'updatemycourses/:id',
                element: <UpdateMyCourses></UpdateMyCourses>,
                loader: ({ params }) => fetch(`https://pet-adoption-server-one.vercel.app/courses/${params.id}`)
            },
            {
                path: 'enrolledcourses',
                element: <EnrolledCourses></EnrolledCourses>
            },
            //only admin routes
            {
                path: 'allusers',
                element: <AllUsers></AllUsers>
                // element: <AdminRoute> <AllUsers></AllUsers></AdminRoute>

            },
            {
                path: 'allpets',
                element: <AllPets></AllPets>
                // element: <AdminRoute> <AllPets></AllPets></AdminRoute>

            },
            {
                path: 'alldonation',
                element: <AllDonation></AllDonation>
                // element: <AdminRoute><AllDonation></AllDonation></AdminRoute>

            },
            {
                path: 'allcourses',
                element: <AllCourses></AllCourses>
            }
        ]
    }
]);
