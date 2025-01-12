import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  clearAllForgotPasswordErrors,
  resetPassword,
} from "@/store/slice/forgotResetpassSlic";
import SpecialLoadingButton from "./sub-component/SpecialLoadingButton";
import { getUser } from "@/store/slice/userSlice";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/"); // Redirect to homepage if user is authenticated
    }
    if (message !== null) {
      toast.success(message);

      navigateTo("/login"); // Redirect to login after success
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, error, message, navigateTo]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            {loading ? (
              <SpecialLoadingButton content={"Resetting Password..."} />
            ) : (
              <Button
                type="button"
                className="w-full"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
