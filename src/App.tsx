import AddSelectionItem from "./pages/addSelectItem";
import FormPage from "./pages/formPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormPage />,
  },
  {
    path: "/add",
    element: <AddSelectionItem />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
