import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <header>
    <NavBar/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
</>
  );
}
