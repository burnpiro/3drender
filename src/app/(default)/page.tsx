import {Link} from "@nextui-org/react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">

      <Link  href={'/login'} isBlock showAnchorIcon color="secondary">
        GO TO LOGIN
      </Link>
    </main>
  )
}
