import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../Layout/Layout";
import SubmitComplain from "../pages/SubmitComplain";
import ComplainField from "../pages/ComplainField";
import ComplaintFeed from "../pages/ComplaintFeed";
import ComplaintsDetails from "../pages/ComplaintsDetails";
import Contact from "../pages/Contact";
import SuccessMessage from "../pages/SuccessMessage";
import About from "../pages/About";
import HowItWorks from "../pages/HowItWorks";
import SearchComplaint from "../pages/SearchComplaint";
import CommunityStandards from "../pages/CommunityStandards";
import Disclaimer from "../pages/Disclaimer";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndCondition from "../pages/TermsAndCondition";
import CommunityRules from "../pages/CommunityRules";
import CommunityGuidelines from "../pages/CommunityGuidelines";
import DataNotice from "../pages/DataNotice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "submit-application",
        element: <SubmitComplain />,
      },
      {
        path: "complaint-filed",
        element: <ComplainField />,
      },
      // {
      //   path: "complaint-feed",
      //   element: <ComplaintFeed />,
      // },
      // {
      //   path: "complaint/:id",
      //   element: <ComplaintsDetails />,
      // },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "community-rules",
        element: <CommunityRules />,
      },
      {
        path: "community-guidelines",
        element: <CommunityGuidelines />,
      },
      {
        path: "message-send-success",
        element: <SuccessMessage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "live-data",
        element: <DataNotice />,
      },
      {
        path: "search-complaints",
        element: <SearchComplaint />,
      },
      {
        path: "community-standards",
        element: <CommunityStandards />,
      },
    ],
  },
]);

export default router;
