import Products from "@/components/product/Products";
import { IQueryParam } from "@/types";
import Shop from "./components/Shop";

interface IProps {
  params: {
    id: string;
  };
}

const ShopPage = ({ params }: IProps) => {
  const { id } = params;

  const customParams: IQueryParam[] = [{ name: "shop", value: id as string }];

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <Shop id={id} />
      <Products customParams={customParams} />
    </div>
  );
};

export default ShopPage;
