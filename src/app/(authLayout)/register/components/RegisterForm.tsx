/* eslint-disable @next/next/no-img-element */
"use client";

import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppSelect from "@/components/form/AppSelect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { useUserRegistration } from "@/hooks/auth.hook";
import { registerValidationSchema } from "@/schemas/auth.schema";
import { IApiResponse } from "@/types";
import { IRegisterResponse } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import httpStatus from "http-status";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function RegisterForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const router = useRouter();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { user, setIsLoading: setUserLoading } = useUser();
  const { mutate: handleUserRegister, isPending } = useUserRegistration();

  const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const registrationData = {
      ...data,
    };

    formData.append("data", JSON.stringify(registrationData));

    for (const image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleUserRegister(formData, {
      onSuccess: (res: IApiResponse<IRegisterResponse>) => {
        if (res.statusCode === httpStatus.CREATED) {
          setRegistrationSuccess(true);
          setUserLoading(true);

          toast.success("Registration successful!");
        } else {
          setRegistrationSuccess(false);

          console.error(res);
          toast.error(res.message);
        }
      },
      onError: (error) => {
        setRegistrationSuccess(false);

        console.error(error);
        toast.error(error.message || "Registration failed. Please try again.");
      },
    });
  };

  useEffect(() => {
    if (!isPending && registrationSuccess && user) {
      const role = user?.role;

      switch (role) {
        case "admin":
          router.push("/admin-dashboard");
          break;

        case "vendor":
          router.push("/vendor-dashboard");
          break;

        default:
          router.push("/");
          break;
      }
    }
  }, [isPending, registrationSuccess, router, user]);

  return (
    <>
      {isPending && <LoadingSpinner />}
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(registerValidationSchema)}
            >
              <AppInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                required
              />

              <AppInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <AppInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />

              <AppSelect
                name="role"
                label="Sign Up As"
                placeholder="Select user type"
                options={[
                  { label: "User", value: "user" },
                  { label: "Vendor", value: "vendor" },
                ]}
                required
              />

              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload profile picture
                </label>
                <input
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageAdd(e)}
                />
              </div>

              <div>
                <div className="flex justify-center m-8">
                  {imagePreviews.length > 0 &&
                    imagePreviews.map((imageDataUrl, index) => (
                      <div
                        key={index}
                        className="relative size-48 rounded-full border-2 border-dashed border-default-300 p-2 group"
                      >
                        <img
                          className="h-full w-full object-cover object-center rounded-full"
                          src={imageDataUrl}
                          alt={"Profile Picture"}
                        />

                        <button
                          className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={() => handleImageDelete()}
                        >
                          <Trash2 className="text-white w-5 h-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </AppForm>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
