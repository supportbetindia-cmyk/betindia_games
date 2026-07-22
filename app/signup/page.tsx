import type { Metadata } from "next";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account — BetIndia",
  description: "Join BetIndia and start betting on sports and playing premium casino games.",
};

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050B18]">
      {/* Page-level ambient glows */}
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/8 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#FF6B00]/6 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
            {/* Left — Branding (desktop only) */}
            <div className="hidden lg:block">
              <AuthBrandPanel />
            </div>

            {/* Right — Form */}
            <div className="flex items-center">
              <div className="w-full">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
