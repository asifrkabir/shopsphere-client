import Shop from "./components/Shop";

const ShopPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">My Shop</h1>
      </div>
      <Shop />
    </div>
  );
};

export default ShopPage;
