import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from "@/store/slice/forgotResetpassSlic";
import SpecialLoadingButton from "./sub-component/SpecialLoadingButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // Notify user of the error
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message) {
      toast.success(message); // Notify user of success
    }
  }, [dispatch, isAuthenticated, error, message]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to recover your account password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Link
                  to={"/login/"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Login with password
                </Link>
              </div>
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Requesting"} />
            ) : (
              <Button
                type="button"
                className="w-full"
                onClick={handleForgotPassword}
              >
                Send Request
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
