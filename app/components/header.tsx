'use client';

import Image from "next/image"
import { useThemeMode } from "../hooks/useThemeMode"
import { ChangeEvent } from "react";

export default function Header() {
    const { isDarkMode, toggleThemeMode } = useThemeMode();

    function handleOptionChange(event: ChangeEvent<HTMLSelectElement>) {
        const selectedValue = event.target.value;
        if (selectedValue === "2") {
            toggleThemeMode();
        }
    }

    return (
        <div
            className="flex flex-row items-center w-full p-[12px] lg:p-[24px] relative"
        >
            <div className="absolute w-screen h-full border-y border-y-[#282828] -left-[12px] lg:-left-[calc((100vw-768px)/2)] pointer-events-none border-opacity-20 dark:border-opacity-100" />

            <a
                className="w-[40px] h-[40px] grid place-items-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-[24px] lg:-translate-x-full"
                href="https://x.com/klkvsky"
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    src={"/assets/Back-arrow.svg"}
                    width={24}
                    height={24}
                    alt="Arrow Back Icon"
                    className="invert dark:invert-0"
                />
            </a>

            <h1
                className="font-semibold text-[24px] lg:text-[32px] font-glysa dark:text-white ml-[12px]"
            >
                Contacts
            </h1>

            <div
                className="flex flex-row items-center ml-auto gap-[8px] relative"
            >
                <button className="w-[40px] h-[40px] hidden lg:grid place-items-center">
                    <Image
                        src={"/assets/Settings.svg"}
                        width={24}
                        height={24}
                        alt="Arrow Back Icon"
                        className="invert dark:invert-0"
                    />
                </button>

                <label
                    className="w-[40px] h-[40px] grid place-items-center relative"
                    htmlFor="mobile-menu"
                >
                    <Image
                        src={"/assets/Profile-pic.svg"}
                        width={24}
                        height={24}
                        alt="Arrow Back Icon"
                    />
                    <select
                        id="mobile-menu"
                        className="opacity-0 absolute top-0 right-0"
                        onChange={handleOptionChange}
                        value=""
                    >
                        <optgroup label="Account">
                            <option disabled value="">Baiel Kulikovsky</option>
                        </optgroup>
                        <optgroup label="">
                            <option value="1">Settings</option>
                            <option value="2">Toggle Theme</option>
                        </optgroup>
                    </select>
                </label>
            </div>

            <button
                className="fixed bottom-[24px] left-1/2 -translate-x-1/2 lg:relative lg:bottom-0 lg:left-0 lg:translate-x-0 h-[40px] w-fit rounded-full p-[1px] grid place-items-center bg-gradient-to-b from-[#CCCCCC] dark:from-[#3C3C3C] lg:ml-[24px]"
            >
                <div
                    className="flex flex-row items-center gap-[8px] px-[16px] py-[8px] bg-gradient-to-b from-[#7F7F7F]/70 to-[#7F7F7F] dark:from-[#282828]/70 dark:to-[#282828] rounded-full"
                >
                    <Image
                        src={"/assets/Add.svg"}
                        width={24}
                        height={24}
                        alt="Arrow Back Icon"
                    />

                    <span
                        className="text-[14px] leading-[20px] tracking-[0.01em] text-white"
                    >
                        Add new
                    </span>
                </div>
            </button>

            <button
                className="w-[40px] h-[40px] hidden md:grid place-items-center absolute top-1/2 -translate-y-1/2 -right-[24px] translate-x-full"
                onClick={toggleThemeMode}
            >
                <Image
                    src={"/assets/Light-mode.svg"}
                    width={24}
                    height={24}
                    alt="Arrow Back Icon"
                    className="invert dark:invert-0"
                />
            </button>
        </div>
    )
}