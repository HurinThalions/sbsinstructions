import { Suspense } from 'react';

import LoginForm from '@/app/ui/auth/login_form';
import Popup from '@/app/ui/popup';
 
export default function LoginPage() {
  return (
    <main>
      <div className="relative rounded-lg drop-shadow mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
      <Suspense>
        <Popup />
      </Suspense>
      <LoginForm />
        
      </div>
    </main>
  );
}