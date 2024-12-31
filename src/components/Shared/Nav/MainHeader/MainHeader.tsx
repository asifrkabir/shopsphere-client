import { CartModal } from "@/components/cart/CartModal";
import NavbarUser from "../../NavbarUser/NavbarUser";
import ProductSearchBar from "../../ProductSearchBar/ProductSearchBar";
import MainMobileNavbar from "../MainMobileNavbar/MainMobileNavbar";
import MainNavbar from "../MainNavbar/MainNavbar";

export default function MainHeader() {
  return (
    <header className="sticky z-10 top-0 w-full bg-emerald-700 px-4">
      <div className="h-16 flex items-center">
        {/* Desktop */}
        <MainNavbar />

        {/* Mobile */}
        <MainMobileNavbar />

        {/* Desktop & mobile */}
        <div className="flex items-center justify-end flex-1 gap-2">
          <ProductSearchBar />
          <CartModal />
          {/* <DarkModeToggle /> */}
          <NavbarUser />
        </div>
      </div>
    </header>
  );
}
