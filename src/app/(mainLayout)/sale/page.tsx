import SalesProducts from "./components/SalesProducts";

const SalePage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">Best deals for you!</h1>
      </div>
      <SalesProducts />
    </div>
  );
};

export default SalePage;
