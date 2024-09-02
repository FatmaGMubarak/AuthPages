import { HashRouter, Route, Routes } from "react-router-dom";
import PublicAuth from "./layout/PublicAuth";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicAuth />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route index path="/login" element={<LogInPage />} />
        </Route>
        <Route  path="/profile" element={<ProfilePage />} />
      </Routes>
    </HashRouter>
  );
}
