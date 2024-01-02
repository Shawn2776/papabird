import { getServerSession } from "next-auth";
import SignInForm from "./components/auth/SignInForm";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/p/dashboard");
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}
