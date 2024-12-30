import logo from "@/assets/images/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { ListItem } from "./ListItem";

const products: { title: string; href: string; description: string }[] = [
  {
    title: "Electronics",
    href: "/products/electronics",
    description: "Explore a wide range of gadgets, devices, and accessories.",
  },
  {
    title: "Fashion",
    href: "/products/fashion",
    description:
      "Discover the latest trends in clothing, shoes, and accessories.",
  },
  {
    title: "Home & Kitchen",
    href: "/products/home-kitchen",
    description: "Shop essentials and decor for your home and kitchen.",
  },
  {
    title: "Sports & Outdoors",
    href: "/products/sports-outdoors",
    description:
      "Gear up for your next adventure with sports and outdoor equipment.",
  },
  {
    title: "Toys & Games",
    href: "/products/toys-games",
    description: "Find fun and exciting toys and games for all ages.",
  },
  {
    title: "Beauty & Personal Care",
    href: "/products/beauty-care",
    description: "Discover beauty products and personal care essentials.",
  },
];

export default function MainNavbar() {
  return (
    <div className="hidden lg:flex text-white">
      <Link href="/" className="flex items-center gap-2 mr-2" prefetch={false}>
        <Image src={logo} alt="logo" width={40} height={40} priority />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {products.map((product) => (
                  <ListItem
                    key={product.title}
                    title={product.title}
                    href={product.href}
                  >
                    {product.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/sale" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Flash Sale!
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/orders" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Orders
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/recent-products" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Recently Viewed
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
