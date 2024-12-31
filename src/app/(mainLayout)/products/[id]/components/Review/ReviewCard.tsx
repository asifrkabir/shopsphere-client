import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IReview } from "@/types";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";

interface IProps {
  review: IReview;
}

const ReviewCard = ({ review }: IProps) => {
  const { user, rating, comment, reply, createdAt } = review;

  return (
    <Card className="w-full shadow-md border">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10">
            {user.profilePicture ? (
              <AvatarImage
                src={user.profilePicture}
                alt={user.name || "User"}
              />
            ) : (
              <AvatarFallback>
                {user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle className="text-base font-medium">
              {user.name || "Anonymous"}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {format(new Date(createdAt), "PPP")}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={`h-5 w-5 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {comment && <p className="text-sm">{comment}</p>}

        {reply && (
          <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg">
            <p className="text-sm font-semibold">Reply from vendor:</p>
            <p className="text-sm  mt-1">{reply}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
