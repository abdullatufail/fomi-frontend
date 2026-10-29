import Image from "next/image";
import { Headset, Images } from "lucide-react";
import Logo from "./Logo";
import NavTabs from "./NavTabs";
import ThemeToggle from "./ThemeToggle";

function HeaderLink({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg border border-line bg-blush-light px-2.5 py-1.5 text-sm text-muted transition hover:border-salmon hover:text-ink focus-visible:outline-2 focus-visible:outline-clay"
    >
      <Icon size={17} className="text-ink" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default function Header() {
  return (
    <header className="mx-auto flex max-w-app flex-wrap items-center justify-between gap-y-5 px-4 pt-5 pb-4 md:px-8 md:pt-7 xl:px-12">
      <Logo />

      <div className="order-last w-full md:order-none md:w-auto">
        <NavTabs />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <HeaderLink icon={Images} label="Gallery" />
        <HeaderLink icon={Headset} label="Support" />
        <ThemeToggle />
        <button
          type="button"
          aria-label="Your account"
          className="rounded-full ring-2 ring-transparent transition hover:ring-salmon focus-visible:outline-2 focus-visible:outline-clay"
        >
          <Image src="/images/avatar.jpg" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
        </button>
      </div>
    </header>
  );
}
