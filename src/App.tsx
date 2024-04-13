import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import "./index.css";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
