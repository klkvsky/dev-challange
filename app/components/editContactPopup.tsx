'use client'

import { useRouter } from "next/navigation";
import { Contact } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function EditContactPopup(props: { contact: Contact, handleClose: () => void }) {
    const { id, photoURL, name, phone, email, isMuted, isFavorite } = props.contact;
    const { handleClose } = props;
    const router = useRouter();


    const [photo, setPhoto] = useState<string | null>(null)
    const [contactName, setContactName] = useState<string>("")
    const [contactPhone, setContactPhone] = useState<string>("")
    const [contactEmail, setContactEmail] = useState<string>("")


    const addNewContact = async () => {
        const request = await fetch("/api/contacts", {
            method: "POST",
            body: JSON.stringify({
                photoURL: photo,
                name: contactName,
                phone: contactPhone,
                email: contactEmail,
                isMuted,
                isFavorite,
            }),
        })

        const response = await request.json()
        router.refresh()
    }

    const editContact = async () => {
        const request = await fetch(`/api/contacts`, {
            method: "PATCH",
            body: JSON.stringify({
                id: id,
                photoURL: photo,
                name: contactName,
                phone: contactPhone,
                email: contactEmail
            }),
        })

        const response = await request.json()
        router.refresh()
    }

    useEffect(() => {
        setContactName(name)
        setContactPhone(phone)
        setContactEmail(email)
    }, [name, phone, email])

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-end md:grid md:place-items-center fixed top-0 left-0 z-40">
            <div
                className="absolute w-full h-full bg-black/80 md:bg-black/40 z-0"
                onClick={() => {
                    handleClose()
                }}
            />
            <form
                className="bg-[#141414] w-full md:w-[364px] h-fit p-[24px] rounded-[8px] overflow-hidden text-white flex flex-col gap-[24px] z-10"
                onSubmit={(e) => {
                    if (name) {
                        editContact()
                    } else {
                        addNewContact()
                    }

                    handleClose()
                }}
            >
                <h1 className="font-glysa text-[24px] font-medium">
                    {name ? "Edit" : "Add"} contact
                </h1>

                <div className="flex flex-row items-center gap-[16px]">
                    <Image
                        src={photo ? photo : photoURL || "/assets/profiles/Default.png"}
                        width={88}
                        height={88}
                        alt="Profile Picture"
                        className="rounded-full overflow-hidden"
                    />

                    <div className="flex flex-row items-center relative">
                        <label
                            className="flex flex-row items-center gap-[8px] bg-[#282828] pl-[12px] pr-[16px] py-[8px] rounded-[8px] overflow-hidden active:scale-[0.95] transition-all active:opacity-80 relative"
                            htmlFor="userPhoto"
                        >
                            <Image
                                src={`/assets/${photoURL || photo ? "Change" : "Add"}.svg`}
                                width={24}
                                height={24}
                                alt="Add Icon"
                            />
                            <span className="text-[14px] leading-[17.5px]">
                                {photoURL || photo ? "Change" : "Add"} picture
                            </span>
                            <input
                                type="file"
                                className="hidden absolute top-0 left-0"
                                id="userPhoto"
                                accept="image/*"
                                onChange={(e) => {
                                    if (!e.target.files) return
                                    const file = e.target.files[0]
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                        setPhoto(reader.result as string)
                                    }
                                    reader.readAsDataURL(file)
                                }}
                            />
                        </label>

                        {(photoURL || photo) && (
                            <button
                                className="flex flex-row items-center gap-[8px] bg-[#282828] p-[8px] ml-[8px] rounded-[8px] overflow-hidden active:scale-[0.95] transition-all active:opacity-80"
                                onClick={() => {
                                    setPhoto(null)
                                }}
                            >
                                <Image
                                    src="/assets/Delete.svg"
                                    width={24}
                                    height={24}
                                    alt="Add Icon"
                                />
                            </button>
                        )}
                    </div>
                </div>


                <label className="flex flex-col gap-[4px]" htmlFor="name">
                    <span className="text-[12px] opacity-[0.56] leading-[16px] tracking-[0.01em]">
                        Name
                    </span>

                    <input
                        type="text"
                        className="w-full bg-[#1E1E1E] rounded-[8px] px-[12px] py-[12px] text-[14px] leading-[17.5px] text-white border border-[#282828] placeholder:opacity-[0.32] focus:border-[#414141] focus:bg-[#282828] transition-all outline-none"
                        placeholder="Jamie Wright"
                        defaultValue={name}
                        id="name"
                        value={contactName}
                        onChange={(e) => {
                            setContactName(e.target.value)
                        }}
                    />
                </label>

                <label
                    className="flex flex-col gap-[4px]"
                    htmlFor="phone_number"
                >
                    <span className="text-[12px] opacity-[0.56] leading-[16px] tracking-[0.01em]">
                        Phone number
                    </span>

                    <input
                        type="text"
                        className="w-full bg-[#1E1E1E] rounded-[8px] px-[12px] py-[12px] text-[14px] leading-[17.5px] text-white border border-[#282828] placeholder:opacity-[0.32] focus:border-[#414141] focus:bg-[#282828] transition-all outline-none"
                        placeholder="+01 234 5678"
                        defaultValue={phone}
                        id="phone_number"
                        value={contactPhone}
                        onChange={(e) => {
                            setContactPhone(e.target.value)
                        }}
                    />
                </label>

                <label
                    className="flex flex-col gap-[4px]"
                    htmlFor="email"
                >
                    <span className="text-[12px] opacity-[0.56] leading-[16px] tracking-[0.01em]">
                        Email address
                    </span>

                    <input
                        type="text"
                        className="w-full bg-[#1E1E1E] rounded-[8px] px-[12px] py-[12px] text-[14px] leading-[17.5px] text-white border border-[#282828] placeholder:opacity-[0.32] focus:border-[#414141] focus:bg-[#282828] transition-all outline-none"
                        placeholder="jamie.wright@mail.com"
                        defaultValue={email}
                        id="email"
                        value={contactEmail}
                        onChange={(e) => {
                            setContactEmail(e.target.value)
                        }}
                    />
                </label>


                <div className="flex flex-row items-center gap-[8px] pt-[24px] justify-end">
                    <button
                        className="px-[16px] py-[11px] rounded-[8px] overflow-hidden hover:bg-[#2D2D2D] transition-all w-full md:w-fit"
                        type="button"
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-[16px] py-[11px] rounded-[8px] overflow-hidden bg-[#262626] hover:bg-[#2D2D2D] transition-all w-full md:w-fit"
                        type="submit"
                    >
                        Done
                    </button>
                </div>
            </form>
        </div>
    )
}