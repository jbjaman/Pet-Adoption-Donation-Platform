# Paw : Pet Adoption & Donation Platform

Paw is a React-based pet adoption and animal-support platform where users can discover pets, submit adoption requests, support donation campaigns, and enroll in educational pet-care courses. The platform also includes dashboard tools for managing pets, campaigns, courses, donations, users, and adoption requests.

- **Live Site:** https://pet-adoption-2b1db.web.app
- **Admin Login:** admin@mail.com
- **Admin Password:** ad123AD!
- **Backend** :

## ◈ Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Pages and Modules](#pages-and-modules)
- [Routing](#routing)
- [Authentication](#authentication)
- [API Architecture](#api-architecture)
- [Data and State Management](#data-and-state-management)
- [Forms and Validation](#forms-and-validation)
- [UI and Design System](#ui-and-design-system)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Development](#development)
- [Production Build](#production-build)
- [Firebase Deployment](#firebase-deployment)
- [Important Implementation Notes](#important-implementation-notes)
- [Future Improvements](#future-improvements)

## ◈ Project Overview

Paw is designed around three main areas:

1. **Pet Adoption**
   - Browse available pets.
   - Search pets by name.
   - Filter pets by category.
   - View detailed pet information.
   - Submit an adoption request.
   - Manage personally listed pets.

2. **Donation Campaigns**
   - Browse active donation campaigns.
   - View campaign details.
   - Create donation campaigns.
   - Update and pause personal campaigns.
   - View donation-related information from the dashboard.
   - Admin-side campaign/donation management.

3. **Pet Education**
   - Browse educational workshops/courses.
   - View course details.
   - Enroll in courses.
   - Track enrolled courses.
   - Create and update courses.
   - Mark courses as finished.
   - Manage courses from the admin dashboard.

The application also provides Firebase-based authentication, JWT-based API authorization, responsive navigation, role-aware dashboard navigation, loading states, empty states, form validation, and confirmation dialogs.

## ◈ Key Features

### Pet Adoption

- Pet listing page with:
  - Search by pet name.
  - Category filtering.
  - Available-pet filtering.
  - Responsive pet cards.
  - Pet image, age, location and date information.
- Individual pet details page.
- Adoption request form.
- User's own pet management.
- Add new pets.
- Update listed pets.
- Delete listed pets.
- Admin-side pet management.
- Adoption request management.

### Donation Campaigns

- Browse donation campaigns.
- View individual campaign details.
- Create donation campaigns.
- Update personal campaigns.
- Pause campaign functionality.
- Delete campaigns.
- User donation-related dashboard section.
- Admin donation management.
- Campaign status handling.

**The campaign details page contains a donation form UI, but its current submit handler only logs the submitted data. There is no Stripe or other real payment gateway implementation in the current frontend code.**

### Educational Workshops and Courses

- Browse educational workshops.
- View individual course details.
- Course information includes:
  - Course name.
  - Instructor.
  - Duration.
  - Location.
  - Course outline.
  - Course image.
- Course enrollment.
- Enrolled-course management.
- Mark enrolled courses as completed.
- Create courses.
- Update courses.
- Finish courses.
- Admin course management.

### Authentication

- Email/password registration.
- Email/password login.
- Google authentication.
- Firebase authentication state management.
- User profile name/photo update.
- JWT token generation through the backend.
- Access token stored in local storage.
- Automatic token attachment to secure API requests.
- Automatic logout/redirect when the API returns `401` or `403`.
- Banned-user handling during login.

### Dashboard

The dashboard provides different management sections depending on the user's role.

#### Regular user features

- Add Pet
- My Pets
- Update My Pets
- My Donation
- My Campaigns
- Update My Campaigns
- Create Campaign
- Adoption Requests
- Create Course
- My Courses
- Update My Courses
- Enrolled Courses

#### Admin features

- All Users
- All Pets
- All Donations
- All Courses

### Responsive UI

The interface is designed for:

- Mobile
- Tablet
- Desktop

The project uses:

- Responsive grids.
- Mobile navigation.
- Responsive dashboard navigation.
- Responsive forms.
- Responsive tables with horizontal scrolling.
- Empty states.
- Loading skeletons.
- Hover/focus states.
- Reusable visual styles.

## ◈ Technology Stack

### Frontend

| Technology         | Purpose                                    |
| ------------------ | ------------------------------------------ |
| React              | UI development                             |
| Vite               | Development server and production bundling |
| React Router DOM   | Client-side routing                        |
| Tailwind CSS       | Styling and responsive design              |
| DaisyUI            | UI utility/components                      |
| React Icons        | Icons                                      |
| Swiper             | Homepage image carousel                    |
| React Helmet Async | Page titles/meta handling                  |

### State and Data

| Technology           | Purpose                              |
| -------------------- | ------------------------------------ |
| TanStack React Query | Server-state fetching/caching        |
| Axios                | REST API requests                    |
| React Context        | Authentication state                 |
| React Hook Form      | Form handling and validation         |
| Formik               | Form library included in the project |

### Authentication

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| Firebase Authentication | Email/password and Google login |
| JWT                     | Backend API authorization       |
| Local Storage           | Stores backend access token     |

### UI Feedback

| Technology  | Purpose                               |
| ----------- | ------------------------------------- |
| SweetAlert2 | Confirmation and success/error alerts |

### Deployment

| Technology       | Purpose             |
| ---------------- | ------------------- |
| Firebase Hosting | Frontend hosting    |
| Vercel           | Backend API hosting |

## ◈ Project Structure

```
Pet-Adoption-Donation-Platform/
│
├── .env.local
├── .eslintrc.cjs
├── .firebaserc
├── firebase.json
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
│
├── public/
│
└── src/
    │
    ├── assets/
    │   └── react.svg
    │
    ├── Components/
    │   ├── SocialLogin/
    │   │   └── SocialLogin.jsx
    │   │
    │   └── Table/
    │       └── Table.jsx
    │
    ├── Firebase/
    │   └── firebase.config.js
    │
    ├── Hooks/
    │   ├── UseAdmin.jsx
    │   ├── UseAuthor.jsx
    │   ├── UseAxiosPublic.jsx
    │   └── UseAxiosSecure.jsx
    │
    ├── Layout/
    │   ├── DashBoard.jsx
    │   └── Main.jsx
    │
    ├── Pages/
    │   │
    │   ├── AddPet/
    │   │   └── AddPet.jsx
    │   │
    │   ├── AdoptionReq/
    │   │   └── AdoptionReq.jsx
    │   │
    │   ├── AllCourses/
    │   │   └── AllCourses.jsx
    │   │
    │   ├── AllDonation/
    │   │   └── AllDonation.jsx
    │   │
    │   ├── AllPets/
    │   │   └── AllPets.jsx
    │   │
    │   ├── AllUsers/
    │   │   └── AllUsers.jsx
    │   │
    │   ├── CreateCampaign/
    │   │   └── CreateCampaign.jsx
    │   │
    │   ├── CreateCourse/
    │   │   └── CreateCourse.jsx
    │   │
    │   ├── DonationCamp/
    │   │   ├── DonationCamp.jsx
    │   │   └── DonationCampDetails.jsx
    │   │
    │   ├── EducationalWorkshop/
    │   │   ├── EducationalWorkshop.jsx
    │   │   └── EducationalWorkshopDetails.jsx
    │   │
    │   ├── EnrolledCourses/
    │   │   └── EnrolledCourses.jsx
    │   │
    │   ├── ErrorPage/
    │   │   ├── DBError.jsx
    │   │   └── SiteError.jsx
    │   │
    │   ├── Home/
    │   │   ├── AboutUs.jsx
    │   │   ├── Banner.jsx
    │   │   ├── CallAction.jsx
    │   │   ├── Category.jsx
    │   │   ├── DonateSection.jsx
    │   │   ├── Education.jsx
    │   │   ├── Home.jsx
    │   │   └── PetFoodExtra.jsx
    │   │
    │   ├── Login/
    │   │   └── Login.jsx
    │   │
    │   ├── MyCampaigns/
    │   │   ├── MyCampaigns.jsx
    │   │   └── UpdateMyCampaigns.jsx
    │   │
    │   ├── MyCourses/
    │   │   ├── MyCourses.jsx
    │   │   └── UpdateMyCourses.jsx
    │   │
    │   ├── MyDonation/
    │   │   └── MyDonation.jsx
    │   │
    │   ├── MyPets/
    │   │   ├── MyPets.jsx
    │   │   └── UpdateMyPets.jsx
    │   │
    │   ├── PetListing/
    │   │   ├── PetDetails.jsx
    │   │   └── PetListing.jsx
    │   │
    │   └── SignUp/
    │       └── SignUp.jsx
    │
    ├── Providers/
    │   └── AuthProvider.jsx
    │
    ├── Routes/
    │   ├── AdminRoute.jsx
    │   ├── PrivateRoute.jsx
    │   └── Routes.jsx
    │
    ├── Shared/
    │   ├── Footer/
    │   │   └── Footer.jsx
    │   │
    │   └── Navbar/
    │       └── Navbar.jsx
    │
    ├── index.css
    └── main.jsx
```
