import {Link} from "@nextui-org/react";
import {auth} from "@/server/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">

      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
      <Link href={'/login'} isBlock showAnchorIcon color="secondary">
        GO TO LOGIN PAGE
      </Link>
    </main>
  )
}
