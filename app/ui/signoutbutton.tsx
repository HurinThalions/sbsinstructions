
import { useSession, signOut } from "next-auth/react";

export default function SignOutButton() {
    const { data: session } = useSession();
  
    if (!session) {
      return null;
    }
  
    return (
      <button
        onClick={() => signOut()}
        className="fixed bottom-4 right-4 p-2 bg-red-500 text-white rounded-lg"
      >
        Sign Out
      </button>
    );
  }
