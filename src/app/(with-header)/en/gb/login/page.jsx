"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
    userLogin,
    sendPasswordlessLink,
    fetchProfileFromMagicLink,
} from "@/lib/store/Auth/authSlice";
import { showToast } from "@/utils/toaster";
import SEO from "@/app/component/common/seo/SEO";
import H1 from "@/app/component/UI/Typography/H1";
import TextInput from "@/app/component/UI/Inputs/InputField";
import PasswordInput from "@/app/component/UI/Inputs/InputField";
import RadioButton from "@/app/component/UI/Inputs/RadioButton";
import Button1 from "@/app/component/UI/Typography/Button1";
import Paragraph2 from "@/app/component/UI/Typography/Paragraph2";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const { lang, country } = useParams();
    const currentLang = lang || "en";
    const currentCountry = country || "gb";

    const [passwordless, setPasswordless] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const { loginLoader, passwordlessLoader } = useSelector(
        (state) => state.auth
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    /* Magic link */
    useEffect(() => {
        const clientIdBase64 = searchParams.get("client_id");

        if (clientIdBase64) {
            dispatch(fetchProfileFromMagicLink())
                .then((res) => {
                    if (res?.success) {
                        document.cookie = "token=logged-in; path=/";

                        if (res.profileData.active_status === 1) {
                            router.replace("/en/gb/sellers/leads");
                        } else if (res.profileData.active_status === 2) {
                            router.replace("/en/gb/buyers/create");
                        }
                    }
                })
                .catch((err) => {
                    showToast("error", err.message);
                });
        }
    }, [dispatch, router, searchParams]);

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!isValidEmail(email)) {
            newErrors.email = "Please enter a valid email address!";
        }

        if (!passwordless) {
            if (!password) {
                newErrors.password = "Password is required!";
            } else if (password.length < 6) {
                newErrors.password = "Password must be at least 6 characters long!";
            }
        }

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setErrors({}); // clear old errors

        if (passwordless) {
            dispatch(sendPasswordlessLink({ email })).then((res) =>
                res?.success
                    ? showToast("success", res.message)
                    : showToast("error", res.message)
            );
            return;
        }

        dispatch(userLogin({ email, password }))
            .then((res) => {
                if (res?.success) {
                    ocument.cookie = rememberMe
                        ? "token=logged-in; path=/; max-age=2592000"
                        : "token=logged-in; path=/";

                    showToast("success", "Login successful!");

                    res?.data?.active_status === 1
                        ? router.replace(`/${currentLang}/${currentCountry}/home`)
                        : router.replace(`/${currentLang}/${currentCountry}/home`);
                    ;
                } else {
                    showToast("error", res?.message || "Login failed. Please try again.");
                }
            }).catch((error) => {
                showToast(
                    "error",
                    error?.response?.data?.message ||
                    "An error occurred. Please try again."
                );
            });

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-[51px] pt-[60px] pb-[50px] max-md:gap-[35px] max-sm:gap-[20px]">
            <SEO conversion />
            {/* LOGIN BOX */}
            <div className="w-full max-w-[600px] bg-white shadow-[0px_0px_4px_1px_#0000001A]
        px-[40px] py-[40px] flex flex-col gap-[10px]
        max-md:px-[30px] max-md:pt-[10px] max-md:pb-[30px]
        max-sm:px-[20px] max-sm:pb-[20px]
      ">
                <h1 className="mb-6 mt-4 font-Inter font-black
        tracking-[-0.03em]
        text-[30px] leading-[32px]
        md:text-[35px] md:leading-[32px]
        lg:text-[40px] lg:leading-[35px]">
                    {passwordless ? <>Passwordless <br /> login</> : "Login"}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        required
                        value={formData.email}
                        error={errors.email}
                        onChange={handleChange}
                    />

                    {!passwordless && (
                        <PasswordInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            error={errors.password}
                            required
                            onChange={handleChange}
                        />
                    )}

                    {/* Remember */}
                    {!passwordless && (
                        <div className="gap-2 text-[16px]">
                            <RadioButton
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                label="Remember me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <Button1
                        type="submit"
                        disabled={loginLoader || passwordlessLoader}
                        className="h-[49px] w-full bg-[#00AFE3] hover:bg-[#4096ff]
    text-white text-[16px] cursor-pointer
    flex items-center justify-center gap-2
    disabled:opacity-70 disabled:cursor-not-allowed
    max-md:h-[45px] max-md:text-[14px]
    max-sm:h-[40px] max-sm:text-[12px]
            " >
                        {(loginLoader || passwordlessLoader) ? (
                            <span className="h-5 w-5 border-3 border-[#4096ff] border-t-transparent rounded-full animate-spin" />
                        ) : passwordless ? (
                            "Send"
                        ) : (
                            "Login"
                        )}
                    </Button1>

                    {/* OR */}
                    {!passwordless && (
                        <>
                            <div className="text-center text-[#ABABAB] text-[20px]
                mt-[15px] mb-[15px]
                max-md:text-[14px] max-md:my-[10px]
              ">
                                OR
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setPasswordless(true);
                                    router.push("/en/gb/passwordless_login");
                                }}
                                className="h-[49px] cursor-pointer border border-[#dedede] text-[16px] hover:border-[#4096ff] hover:text-[#4096ff]
                  rounded-full
                  max-md:h-[45px] max-md:text-[14px]
                  max-sm:h-[40px] max-sm:text-[12px]
                " >
                                Send me a link to log in
                            </button>
                        </>
                    )}

                    {passwordless && (
                        <button
                            type="button"
                            onClick={() => {
                                setPasswordless(false);
                                router.push(`/${currentLang}/${currentCountry}/login`);
                            }}
                            className="text-left text-[#ABABAB] mt-4"
                        >
                            Back to Login
                        </button>
                    )}
                </form>
            </div>

            {/* BOTTOM LINKS */}
            {!passwordless && (
                <div className="text-center
        ">
                    <Paragraph2>
                        Offering a service?{" "}
                        <Link href={`/${currentLang}/${currentCountry}/sellers/create`} className="text-[#00AFE3] underline">
                            Join as a professional
                        </Link>
                    </Paragraph2>
                    <Paragraph2 className="mt-2">
                        Looking for a service?{" "}
                        <Link href={`/${currentLang}/${currentCountry}/`} className="text-[#00AFE3] underline">
                            Get started
                        </Link>
                    </Paragraph2>
                </div>
            )}
        </div>
    );
}
