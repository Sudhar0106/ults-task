import "./App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/dashboard.jsx";
import MemoryCard from "./game/index.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<MemoryCard />} />
        <Route path='/task2' element={<Dashboard />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
