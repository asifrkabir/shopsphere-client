import Footer from "@/components/Shared/Footer/Footer";
import MainHeader from "@/components/Shared/Nav/MainHeader/MainHeader";
import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { CartProvider } from "@/context/cart.provider";
import { RecentProductsProvider } from "@/context/recentProducts.provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CartProvider>
        <RecentProductsProvider>
          <MainHeader />
          <ScrollToTopButton />
          <div className="min-h-screen w-full p-8 bg-gray-50">{children}</div>
          <Footer />
        </RecentProductsProvider>
      </CartProvider>
    </div>
  );
}
