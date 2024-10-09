import SignupForm from "@/app/ui/auth/signup_form";

export default function SignupPage() {
  return (
    <main>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <SignupForm />
      </div>
    </main>
  );
}
