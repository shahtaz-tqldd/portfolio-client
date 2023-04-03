import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import { Toaster } from 'react-hot-toast';
import './assets/styles/style.css'
import './assets/styles/responsive.css'

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
      <Toaster/>
    </div>
  );
}

export default App;
