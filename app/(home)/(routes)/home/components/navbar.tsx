import MenuCine from "./menu";
import UserInfoDropdownCine from "./userInfo";
import Image from "next/image";
import Link from "next/link";

export default async function NavbarCine() {
  return (
    <>
      <div className="bg-black ">
        <div className="flex h-16 items-center px-4 w-full justify-between ">
          <MenuCine />
          <Link href="/home" className="mt-3">
            <div className="w-36 h-16 relative pt-2">
              <Image
                src={
                  "https://res.cloudinary.com/dpmbuqjqj/image/upload/v1702862537/logo.mcine_mjupbm.svg"
                }
                alt="logo"
                fill
              />
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            {/* <ThemeSwitcher /> */}
            <UserInfoDropdownCine />
          </div>
        </div>
      </div>
    </>
  );
}
