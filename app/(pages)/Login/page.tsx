import LoginForm from "@/app/ui/login_form";

export default function LoginSeite() {

    return (
        <main className="flex items-center justify-center ">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-2 md:-mt-32">
          <div className="flex h-20 w-full items-end p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              
            </div>
          </div>
          <LoginForm />
        </div>
      </main>
    );
}
