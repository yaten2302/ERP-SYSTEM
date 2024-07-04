import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInUser } from "@/lib/supabase/api";
import { SignInValidiation } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const SigninForm = () => {
  useEffect(() => {
    document.title = "Sign in";
  }, []);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignInValidiation>>({
    resolver: zodResolver(SignInValidiation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isStudent } = useUserContext();

  const { toast } = useToast();

  //function to be run on clicking the sign-in button
  async function onSubmit(values: z.infer<typeof SignInValidiation>) {
    const session = await signInUser(values);

    if (!session) {
      return toast({
        title: "Sign in failed. Please try again",
        variant: "destructive",
      });
    } else {
      isStudent ? navigate("/student") : navigate("/teacher");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="flex justify-center gap-3">
          <img
            src="/assets/vips_logo.svg"
            alt="vips_logo"
            className="h-[55px] w-[55px] tablet:h-[75px] tablet:w-[75px] laptop:h-[80px] laptop:w-[80px]"
          />
          <h1 className="h1-mobile tablet:h1-tablet laptop:h1-laptop">
            Vivekananda Institute Of Professional Studies
          </h1>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <h3 className=" h3-mobile tablet:h3-tablet laptop:h3-laptop">
            Welcome Back👋
          </h3>
          <p className="p-mobile tablet:p-tablet laptop:p-laptop">
            To use VIPS Vanguard, please enter your details
          </p>
        </div>

        <div className="self-center mt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start pb-4">
                    <FormLabel className="shad-form_label-light">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        className="shad_input-light"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start pb-4">
                    <FormLabel className="shad-form_label-light">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        className="shad_input-light"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="shad_button-primary w-full">
                Log in
              </Button>
              <Button className="text-primary-500 hover:text-primary-600 pt-0">
                Forgot Password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
