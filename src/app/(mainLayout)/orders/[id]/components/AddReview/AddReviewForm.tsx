import AppForm from "@/components/form/AppForm";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import { useCreateReview } from "@/hooks/review.hook";
import { createReviewValidationSchema } from "@/schemas/review.schema";
import { IApiResponse, ICreateReview, IReview } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

interface IProps {
  closeModal: () => void;
  productId: string;
}

const AddReviewForm = ({ closeModal, productId }: IProps) => {
  const { id: orderId } = useParams();
  const { mutate: createReview, isPending } = useCreateReview();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const reviewData: ICreateReview = {
      product: productId,
      order: orderId as string,
      rating,
      comment: data?.comment,
    };

    createReview(reviewData, {
      onSuccess: (res: IApiResponse<IReview>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Review created successfully");

          queryClient.invalidateQueries({
            queryKey: ["REVIEWS"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to add product review. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to add product review. Please try again."
        );
      },
    });
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(createReviewValidationSchema)}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex space-x-2 mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-6 w-6 cursor-pointer transition ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>

          <AppTextarea
            name="comment"
            label="Comment"
            type="text"
            placeholder="Enter comment"
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
};

export default AddReviewForm;
