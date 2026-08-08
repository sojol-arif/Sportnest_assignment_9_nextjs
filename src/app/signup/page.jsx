'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        console.log(user, 'user from front end SignUp');

        const { data, error } = await authClient.signUp.email({
            email: user.email, // user email address
            password: user.password, // user password -> min 8 characters by default
            name: user.name, // user display name
            image: user.photo, // User image URL (optional)
        });

        if (data) {
            router.push('/')
        }

        if (error) {
            alert(error);
        }

        console.log({ data, error });
    };

    const handleGoogleSignIn = async () => {
        console.log('a');
        await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <div className="min-h-screen bg-[#f4f6f2] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-[420px]">
                <div className="text-center mb-8">
                    <Link href={'/'} className="inline-flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"><span className="text-white text-[11px] font-medium">SN</span></div>
                        <span className="font-medium text-default">SportNest</span>
                    </Link>
                    <h1 className="text-2xl font-medium text-default">Welcome back</h1>
                    <p className="text-gray-400 text-sm mt-1 font-light">Sign in to your account to continue</p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.06)]">
                    <button onClick={handleGoogleSignIn} className="w-full border border-[rgba(0,0,0,0.08)] py-2.5 rounded-xl text-sm text-gray-500 hover:bg-[#f4f6f2] transition-colors flex items-center justify-center gap-2 font-light cursor-pointer">
                        <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                        Sign up with Google
                    </button>
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs text-gray-400">
                            <span className="bg-white px-3">or continue with</span>
                        </div>
                    </div>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Full Name</label>
                            <input name="name" type="text" placeholder="John Smith" className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border rounded-xl text-sm focus:outline-none transition-colors border-[rgba(0,0,0,0.06)] focus:border-[#3d8b5e]" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Email Address</label>
                            <input name="email" type="email" placeholder="you@example.com" className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border rounded-xl text-sm focus:outline-none transition-colors border-[rgba(0,0,0,0.06)] focus:border-[#3d8b5e]" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Photo URL</label>
                            <input name="photo" type="url" placeholder="https://... (optional)" className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border rounded-xl text-sm focus:outline-none transition-colors border-[rgba(0,0,0,0.06)] focus:border-[#3d8b5e]" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
                            <input name="password" type="password" placeholder="Min 6 chars, upper &amp; lowercase" className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border rounded-xl text-sm focus:outline-none transition-colors border-[rgba(0,0,0,0.06)] focus:border-[#3d8b5e]" />
                        </div>
                        <button type="submit" className="w-full bg-[#3d8b5e] text-white py-2.5 rounded-xl text-sm hover:bg-[#326d4b] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1 font-normal"> Create Account</button>
                    </form>
                    <p className="text-center text-xs text-gray-400 mt-5 font-light">Already have an account? <a className="text-[#3d8b5e] hover:underline font-normal" href="/login" data-discover="true">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;