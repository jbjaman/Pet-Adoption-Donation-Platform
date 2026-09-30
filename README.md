# Paw : Pet Adoption & Donation Platform

Paw is a React-based pet adoption and animal-support platform where users can discover pets, submit adoption requests, support donation campaigns, and enroll in educational pet-care courses. The platform also includes dashboard tools for managing pets, campaigns, courses, donations, users, and adoption requests.

- **Live Site:** https://pet-adoption-2b1db.web.app
- **Admin Login:** admin@mail.com
- **Admin Password:** ad123AD!
- **Backend** : https://github.com/jbjaman/Paw-Backend

# Table of Contents

- [1. Project Overview](#project-overview)
- [2. Key Features](#key-features)
- [3. Technology Stack](#technology-stack)
- [4. Project Structure](#project-structure)
- [5. Routing](#routing)
- [6. API Architecture](#api-architecture)
- [7. Data and State Management](#data-and-state-management)
- [8. Firebase Deployment](#firebase-deployment)
- [9. Important Implementation Notes](#important-implementation-notes)
- [10. Future Improvements](#future-improvements)

# Project Overview

Paw is designed around three main areas:

- **Pet Adoption**
  - Browse available pets.
  - Search pets by name.
  - Filter pets by category.
  - View detailed pet information.
  - Submit an adoption request.
  - Manage personally listed pets.

- **Donation Campaigns**
  - Browse active donation campaigns.
  - View campaign details.
  - Create donation campaigns.
  - Update and pause personal campaigns.
  - View donation-related information from the dashboard.
  - Admin-side campaign/donation management.

- **Pet Education**
  - Browse educational workshops/courses.
  - View course details.
  - Enroll in courses.
  - Track enrolled courses.
  - Create and update courses.
  - Mark courses as finished.
  - Manage courses from the admin dashboard.

The application also provides Firebase-based authentication, JWT-based API authorization, responsive navigation, role-aware dashboard navigation, loading states, empty states, form validation, and confirmation dialogs.

# Key Features

### ◈ Pet Adoption

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

### ◈ Donation Campaigns

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

### ◈ Educational Workshops and Courses

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

### ◈ Authentication

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

### ◈ Dashboard

The dashboard provides different management sections depending on the user's role.

- Regular user features
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

- Admin features
  - All Users
  - All Pets
  - All Donations
  - All Courses

- Responsive UI
  - Mobile
  - Tablet
  - Desktop

- The project uses:
  - Responsive grids.
  - Mobile navigation.
  - Responsive dashboard navigation.
  - Responsive forms.
  - Responsive tables with horizontal scrolling.
  - Empty states.
  - Loading skeletons.
  - Hover/focus states.
  - Reusable visual styles.

# Technology Stack

### ◈ Frontend

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

### ◈ State and Data

| Technology           | Purpose                              |
| -------------------- | ------------------------------------ |
| TanStack React Query | Server-state fetching/caching        |
| Axios                | REST API requests                    |
| React Context        | Authentication state                 |
| React Hook Form      | Form handling and validation         |
| Formik               | Form library included in the project |

### ◈ Authentication

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| Firebase Authentication | Email/password and Google login |
| JWT                     | Backend API authorization       |
| Local Storage           | Stores backend access token     |

### ◈ UI Feedback

| Technology  | Purpose                               |
| ----------- | ------------------------------------- |
| SweetAlert2 | Confirmation and success/error alerts |

### ◈ Deployment

| Technology       | Purpose             |
| ---------------- | ------------------- |
| Firebase Hosting | Frontend hosting    |
| Vercel           | Backend API hosting |

# Project Structure

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

# Routing

The application uses React Router's `createHashRouter`.
Because of this, routes appear after `/#/`.

Examples:

```
/#/
/#/petlist
/#/petdetails/:id
/#/dtncamp
/#/dtncampdetails/:id
/#/education
/#/education/:id
/#/login
/#/signup
/#/dashboard
```

### ◈ Public Routes

| Route                 | Purpose                   |
| --------------------- | ------------------------- |
| `/`                   | Homepage                  |
| `/petlist`            | Available pet listing     |
| `/petdetails/:id`     | Pet details               |
| `/dtncamp`            | Donation campaigns        |
| `/dtncampdetails/:id` | Donation campaign details |
| `/education`          | Educational workshops     |
| `/education/:id`      | Course details            |
| `/login`              | Login                     |
| `/signup`             | Registration              |

### ◈ Dashboard Routes

| Route                              | Purpose               |
| ---------------------------------- | --------------------- |
| `/dashboard/addpet`                | Add a pet             |
| `/dashboard/mypets`                | Manage user's pets    |
| `/dashboard/updatemypets/:id`      | Update a pet          |
| `/dashboard/mydonation`            | User donation section |
| `/dashboard/mycampaigns`           | User campaigns        |
| `/dashboard/updatemycampaigns/:id` | Update campaign       |
| `/dashboard/createcampaign`        | Create campaign       |
| `/dashboard/adoptionreq`           | Adoption requests     |
| `/dashboard/createcourse`          | Create course         |
| `/dashboard/mycourses`             | User courses          |
| `/dashboard/updatemycourses/:id`   | Update course         |
| `/dashboard/enrolledcourses`       | Enrolled courses      |

### ◈ Admin Routes

| Route                    | Purpose            |
| ------------------------ | ------------------ |
| `/dashboard/allusers`    | Manage users       |
| `/dashboard/allpets`     | Manage all pets    |
| `/dashboard/alldonation` | Manage donations   |
| `/dashboard/allcourses`  | Manage all courses |

# API Architecture

The frontend communicates with: https://pet-adoption-server-one.vercel.app

The project uses two Axios clients.

### ◈ Public Axios

`UseAxiosPublic.jsx`

Used for public API requests.

Base URL: https://pet-adoption-server-one.vercel.app

### ◈ Secure Axios

`UseAxiosSecure.jsx`

Used for authenticated operations.

## Main API Resources

The frontend interacts with the following backend resources.

### ◈ Users

```text
GET    /users
GET    /users/admin/:email
GET    /users/admin/:id
PATCH  /users/:id
```

Used for:

- User listing.
- Role checking.
- Admin management.
- User updates.

### ◈ Authentication

```text
POST /jwt
```

Used to obtain the backend JWT after Firebase authentication.

### ◈ Pets

```text
GET    /pets
GET    /pets/:id
POST   /pets
PATCH  /pets/:id
DELETE /pets/:id
```

Used for:

- Pet listing.
- Pet details.
- Adding pets.
- Updating pets.
- Deleting pets.
- Admin pet management.

### ◈ Adoption

```text
POST   /adoption
GET    /adoption
PATCH  /adoption/:id
DELETE /adoption/:id
```

Used for adoption request creation and management.

### ◈ Donations

```text
GET    /donations
GET    /donations/:id
POST   /donations
PATCH  /donations/:id
DELETE /donations/:id
```

Used for campaign creation, listing, updating, pausing and deletion.

### ◈ Courses

```text
GET    /courses
GET    /courses/:id
POST   /courses
PATCH  /courses/:id
PUT    /courses/:id
DELETE /courses/:id
```

Used for course management.

### ◈ Enrollments

```text
GET    /enrolled
POST   /enrolled
PATCH  /enrolled/:id
DELETE /enrolled/:id
```

Used for course enrollment and completion management.

# Firebase Deployment

The project is already configured for Firebase Hosting.

`firebase.json` uses:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

The rewrite is important because the application is a client-side React application.

### ◈ Deploy Updated Code

After changing the frontend:

```bash
npm run build
firebase login
firebase deploy --only hosting
```

# Data and State Management

The project uses **TanStack React Query** for server state.

- React Query is used for:
  - Fetching API data.
  - Caching server responses.
  - Refetching after mutations.
  - Managing loading states.
- Local UI state is handled with React hooks.
- Authentication state is managed globally through: AuthProvider, AuthContext, UseAuthor

### ◈ Forms and Validation

The project primarily uses **React Hook Form** for forms such as:

- Login.
- Registration.
- Add Pet.
- Update Pet.
- Create Campaign.
- Update Campaign.
- Create Course.
- Update Course.
- Adoption Request.
- Course Enrollment.
- Donation form UI.

Validation errors are displayed directly inside the relevant form fields.

### ◈ Image Upload

The project uses **ImgBB** for image hosting in forms that upload images. The image is uploaded first and the resulting image URL is then stored with the relevant application data.

# Important Implementation Notes

### ◈ Hash Routing

The application uses:

```jsx
createHashRouter(...)
```

instead of browser-history routing.

Therefore URLs contain:

```text
/#/
```

This also works well with Firebase Hosting without requiring server-side route handling for every React route.

### ◈ Backend Is Separate

This repository is the **frontend/client application**.

The backend API is hosted separately and is referenced by the frontend through Axios and route loaders.

Changing frontend code does not deploy or modify the backend.

### ◈ Firebase Is Used for Authentication

- Firebase Authentication handles:
  - Account creation.
  - Email/password login.
  - Google login.
  - Logout.
  - Firebase auth-state monitoring.
  - User profile information.

### ◈ Role-Based Dashboard

The dashboard reads user information from the backend and uses the role to display administration navigation.

Admin-specific areas include:

```text
All Users
All Pets
All Donations
All Courses
```

### ◈ Donation Payment Status

The current frontend contains a donation amount and credit-card form UI.
However, the current submit handler does not connect to Stripe, PayPal, or another payment processor. It currently logs the submitted information.

Therefore, the project should **not** be described as having a production payment gateway unless one is added later.

### ◈ Image Hosting

Pet, course, and campaign forms use an external image-hosting service rather than Firebase Storage.

# Future Improvements

The current application can be extended with:

- Real payment integration such as Stripe.
- Stronger route protection by activating `PrivateRoute` and `AdminRoute`.
- Server-side pagination for large pet/course/campaign datasets.
- More advanced pet filtering.
- Donation progress based on real transaction totals.
- Better API error handling and retry states.
- Centralized API endpoint constants.
- Better TypeScript coverage.
- Automated testing.
- Accessibility improvements.
- Image optimization.
- Production logging and monitoring.
- More granular user permissions.

# Project Summary

Paw combines pet adoption, community support, donation campaigns, and pet education into a single responsive web application.

```
                    PAW
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
   Adoption      Donations      Education
       │             │             │
       ▼             ▼             ▼
    Pets &        Campaigns     Courses &
    Requests                     Enrollment
       │             │             │
       └─────────────┼─────────────┘
                     │
                     ▼
               User Dashboard
                     │
                     ▼
              Admin Management
```

The frontend is built with React and Vite, Firebase handles authentication, the Vercel-hosted REST API handles application data, React Query manages server state, Axios handles HTTP communication, and Firebase Hosting serves the production frontend.
