"use client";

import AppForm from "@/components/form/AppForm";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import { useReplyToReview } from "@/hooks/review.hook";
import { replyToReviewValidationSchema } from "@/schemas/review.schema";
import { IApiResponse, IReplyToReview, IReview } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  id: string;
  closeModal: () => void;
}

const ReplyToReviewForm = ({ id, closeModal }: IProps) => {
  const { mutate: replyToReview, isPending } = useReplyToReview();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const replyData: IReplyToReview = {
      id: id,
      payload: {
        reply: data.reply,
      },
    };

    replyToReview(replyData, {
      onSuccess: (res: IApiResponse<IReview>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Replied to review successfully");

          queryClient.invalidateQueries({
            queryKey: ["REVIEWS"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to reply to review. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to reply to review. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(replyToReviewValidationSchema)}
        >
          <AppTextarea
            name="reply"
            label="Reply"
            type="text"
            placeholder="Enter your reply"
            required
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

export default ReplyToReviewForm;
