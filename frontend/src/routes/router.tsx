// import { createBrowserRouter, Outlet } from "react-router-dom";
// import {
//   PageContainer,
//   LeftColumn,
//   RightColumn,
//   PageContent,
// } from "../styles/mainPage";


// const Layout = () => (
//   <>
//     <PageContainer>
//       <LeftColumn />
//       <RightColumn />
//       <PageContent>
//         <Outlet />
//       </PageContent>
//     </PageContainer>
//   </>
// );

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "home",
//         element: (
//             <div>hello guys</div>
//         ),
//       },
//     ],
//   },
// ]);

// export default router;




// routes/router.tsx

import { createBrowserRouter } from "react-router-dom";
import {
  PageContainer,
  LeftColumn,
  RightColumn,
  PageContent,
} from "../styles/mainPage";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <PageContainer>
    <LeftColumn />
    <RightColumn />
    <PageContent>
      <Outlet />
    </PageContent>
  </PageContainer>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <div>hello guys</div>,
      },
    ],
  },
]);

export default router;