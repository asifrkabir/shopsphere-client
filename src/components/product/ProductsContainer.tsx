import { getAllProductsForFeedQuery } from "@/hooks/product.hook";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "./Products";

const ProductsContainer = async (): Promise<JSX.Element> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getAllProductsForFeedQuery());

  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <Products />
      </HydrationBoundary>
    </div>
  );
};

export default ProductsContainer;
