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
    title: "All",
    href: "/products",
    description: "Browse through thousands of available products.",
  },
  {
    title: "Electronics & Gadgets",
    href: "/products?category=67724ca2011523881931ed0e",
    description: "Explore a wide range of gadgets, devices, and accessories.",
  },
  {
    title: "Fashion & Apparel",
    href: "/products?category=67724ff0011523881931ed5d",
    description:
      "Discover the latest trends in clothing, shoes, and accessories.",
  },
  {
    title: "Health & Beauty",
    href: "/products?category=67724ffa011523881931ed6b",
    description: "Discover beauty products and personal care essentials.",
  },
  {
    title: "Books & Stationery",
    href: "/products?category=67725004011523881931ed70",
    description:
      "Browse a wide selection of books, notebooks, and stationery items.",
  },
  {
    title: "Sports & Outdoors",
    href: "/products?category=67725009011523881931ed75",
    description:
      "Gear up for your next adventure with sports and outdoor equipment.",
  },
  {
    title: "Toys, Kids & Baby",
    href: "/products?category=6772500c011523881931ed7a",
    description: "Find fun and exciting toys and games for all ages.",
  },
  {
    title: "Home & Kitchen",
    href: "/products?category=677250a7011523881931eda7",
    description: "Shop essentials and decor for your home and kitchen.",
  },
  {
    title: "Groceries & Gourmet Foods",
    href: "/products?category=677250ae011523881931edac",
    description: "Stock up on everyday essentials and gourmet food products.",
  },
  {
    title: "Automotive & Tools",
    href: "/products?category=677250b3011523881931edb1",
    description:
      "Find automotive parts, tools, and accessories for every need.",
  },
  {
    title: "Pet Supplies",
    href: "/products?category=677250b6011523881931edb6",
    description:
      "Shop for pet food, toys, and accessories for your furry friends.",
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
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[800px] ">
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
