import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { DashBoard } from "./Pages/DashBoard";
import { Payment } from "./Pages/Payment";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { useRecoilValue } from "recoil";
import { authenticationAtom } from "./atoms/authAtom";

function App() {
  const isUser = useRecoilValue(authenticationAtom);
  console.log("user " + isUser);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isUser ? <DashBoard /> : <Navigate to="/signin" />}
          />
          <Route
            path="/signup"
            element={!isUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/signin"
            element={!isUser ? <Signin /> : <Navigate to="/" />}
          />
          <Route
            path="/payment"
            element={isUser ? <Payment /> : <Navigate to="/signin" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
