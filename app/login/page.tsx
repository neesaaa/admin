import logo from "@/assets/Mask group.png";
import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a2a3f] p-4">
      <div className="mb-8">
      <Image
          src={logo}
          alt="Company Logo"
          priority
        />
    </div>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
