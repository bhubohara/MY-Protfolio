import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllUserErrors, login } from "@/store/slice/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-component/SpecialLoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(email, password)); // Dispatch login action
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/"); // Redirect to homepage if user is authenticated
    }

    // Check for error only if the login attempt has been made (and failed)
    if (error) {
      toast.error(error); // Show error message
      dispatch(clearAllUserErrors()); // Clear error after showing it
    }

    // Clear errors when loading state changes
    if (loading === false) {
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, isAuthenticated, error, loading, navigateTo]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/password/forgot"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Logging In..."} />
            ) : (
              <Button type="submit" className="w-full" onClick={handleLogin}>
                Login
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
