'use client'

import Image from "next/image";
import { motion } from "framer-motion"
import { ContactType } from "../types";
import { useEffect, useState } from "react";
import EditContactPopup from "./editContactPopup";

export function ContactListItem(contact: ContactType) {
  const { photoURL, name, phone, email, isMuted, isFavorite } = contact;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobile && isMenuOpen ? "hidden" : "auto";

    if (!isMenuOpen) {
      setCurrentY(0)
      setStartY(0)
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile, isMenuOpen]);

  return (
    <div
      className="flex flex-row items-center gap-[8px] md:gap-[16px] group md:min-h-[64px] md:h-[64px] min-h-[48px] h-[48px]"
      onMouseLeave={() => !isMobile && setIsMenuOpen(false)}
    >
      <div
        className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px]"
        onClick={() => {
          isMobile && setIsMenuOpen(true);
        }}
      >
        <Image
          src={photoURL || "/assets/Profile-pic-small.png"}
          fill
          alt="Profile Picture"
          className="rounded-full overflow-hidden object-cover"
        />
      </div>

      <div
        className="flex flex-col"
        onClick={() => {
          isMobile && setIsMenuOpen(true);
        }}
      >
        <h3 className="text-[14px] md:text-[16px] leading-[24px] tracking-[0.01em] dark:text-white whitespace-nowrap">
          {name}
        </h3>
        <a
          className="text-[12px] leading-[16px] tracking-[0.01em] dark:text-white opacity-[0.56]"
          href={`tel:${phone}`}
        >
          {phone}
        </a>
      </div>

      <div className="flex flex-row items-center ml-auto gap-[8px] md:opacity-0 md:group-hover:opacity-100 transition-all relative">
        <button className="w-[40px] h-[40px] hidden md:grid place-items-center hover:bg-[#1E1E1E] transition-all rounded-[8px] active:scale-[0.95] active:opacity-80 invert dark:invert-0">
          <Image
            src={"/assets/Mute.svg"}
            width={24}
            height={24}
            alt="Arrow Back Icon"
          />
        </button>
        <button className="w-[40px] h-[40px] hidden md:grid place-items-center hover:bg-[#1E1E1E] transition-all rounded-[8px] active:scale-[0.95] active:opacity-80 invert dark:invert-0">
          <Image
            src={"/assets/Call.svg"}
            width={24}
            height={24}
            alt="Arrow Back Icon"
          />
        </button>
        <button
          className={`w-[40px] h-[40px] hidden md:grid place-items-center hover:bg-[#1E1E1E]/100 transition-all rounded-[8px] active:scale-[0.95] active:opacity-80 invert dark:invert-0   
          ${isMenuOpen && "bg-[#1E1E1E]/100"}`}
          onClick={handleMenuButtonClick}
        >
          <Image
            src={"/assets/More.svg"}
            width={24}
            height={24}
            alt="Arrow Back Icon"
          />
        </button>

        <motion.div
          className="w-[calc(100vw-24px)] md:w-[219px] h-fit dark:bg-[#1E1E1E] bg-gray-100 flex flex-col dark:text-white rounded-[16px] md:rounded-[8px] overflow-hidden fixed bottom-0 left-[12px] rounded-b-none md:rounded-b-[8px] md:absolute md:left-full md:top-full border border-b-0 border-gray-200 dark:border-black/10 md:border-0"
          style={{
            pointerEvents: isMenuOpen ? "auto" : "none",
            zIndex: isMenuOpen ? 20 : -1,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMobile ? isMenuOpen ? currentY / 5 : 200 : 8,
            x: isMobile ? 0 : -40
          }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: isDragging ? 0 : 0.15, ease: "easeInOut" }}
          onTouchStart={(e) => {
            setIsDragging(true)
            setStartY(e.touches[0].clientY)
          }}
          onTouchMove={(e) => {
            setCurrentY(e.touches[0].clientY)
          }}
          onTouchEnd={() => {
            if (currentY > startY) {
              setIsDragging(false)
              setIsMenuOpen(false)
            }
          }}
        >
          <div className="relative w-full aspect-square overflow-hidden flex flex-col justify-end md:hidden">
            <Image
              src={photoURL || "/assets/Profile-pic-small.png"}
              fill
              alt="Profile Picture"
              className="object-cover blur-3xl absolute top-0 left-0 -z-10 brightness-50"
            />

            <div className="flex flex-col items-center z-10 w-full  justify-center text-center">
              <div className="w-1/2 aspect-square rounded-full overflow-hidden relative">
                <Image
                  src={photoURL || "/assets/Profile-pic-small.png"}
                  fill
                  alt="Profile Picture"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[24px] dark:text-white whitespace-nowrap font-glysa mt-[12px]">{name}</h3>
                <a className="text-[14px] dark:text-white opacity-[0.56]" href={`tel:${phone}`}>
                  {phone}
                </a>
                <a className="text-[14px] dark:text-white opacity-[0.56]" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            </div>
            <div className="flex flex-row items-center gap-[8px] justify-center p-[8px] md:hidden">
              <button className="flex flex-col items-center gap-[4px] bg-white/70 dark:bg-[#232323]/70 backdrop-blur-md transition-all py-[12px] group w-full rounded-lg">
                <Image
                  src={"/assets/Mute.svg"}
                  width={28}
                  height={28}
                  alt="Arrow Back Icon"
                  className="group-active:scale-[0.95] invert dark:invert-0"
                />

                <span className="text-[12px] opacity-80">Mute</span>
              </button>
              <button className="flex flex-col items-center gap-[4px] bg-white/70 dark:bg-[#232323]/70 backdrop-blur-md transition-all py-[12px] group w-full rounded-lg">
                <Image
                  src={"/assets/Call.svg"}
                  width={28}
                  height={28}
                  alt="Arrow Back Icon"
                  className="group-active:scale-[0.95] invert dark:invert-0"
                />

                <span className="text-[12px] opacity-80">Call</span>
              </button>
            </div>
          </div>
          <button
            className="flex flex-row items-center gap-[12px] dark:hover:bg-[#232323] hover:bg-gray-300 transition-all py-[12px] px-[10px] group"
            onClick={() => {
              setIsEditing(true)
              setIsMenuOpen(false)
            }}
          >
            <Image
              src={"/assets/Settings.svg"}
              width={20}
              height={20}
              alt="Arrow Back Icon"
              className="group-active:scale-[0.95] invert dark:invert-0"
            />

            <span className="text-[14px] leading-[20px] tracking-[0.01em]">Edit</span>
          </button>
          <button className="flex flex-row items-center gap-[12px] dark:hover:bg-[#232323] hover:bg-gray-300 transition-all py-[12px] px-[10px]">
            <Image
              src={"/assets/Favourite.svg"}
              width={20}
              height={20}
              alt="Arrow Back Icon"
              className="invert dark:invert-0"
            />

            <span className="text-[14px] leading-[20px] tracking-[0.01em]">Favourite</span>
          </button>
          <button className="flex flex-row items-center gap-[12px] dark:hover:bg-[#232323] hover:bg-gray-300 transition-all py-[12px] px-[10px]">
            <Image
              src={"/assets/Delete.svg"}
              width={20}
              height={20}
              alt="Arrow Back Icon"
              className="invert dark:invert-0"
            />

            <span className="text-[14px] leading-[20px] tracking-[0.01em]">Remove</span>
          </button>
        </motion.div>
      </div>

      {isEditing &&
        <EditContactPopup
          contact={contact}
          handleClose={() => {
            setIsEditing(false)
            setIsMenuOpen(false)
          }}
        />
      }
    </div>
  );
}