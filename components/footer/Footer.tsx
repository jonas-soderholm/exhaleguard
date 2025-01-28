import { LogoName } from "@/constants/logo-name";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8 mt-24">
      <p>{LogoName.AppName}</p>
    </footer>
  );
}
