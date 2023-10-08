import { ContactType } from "../types";
import Image from "next/image";

export default function EditContactPopup(props: { contact: ContactType, handleClose: () => void }) {
    const { photoURL, name, phone, email, isMuted, isFavorite } = props.contact;
    const { handleClose } = props;

    return (
        <div className="w-screen h-screen grid place-items-center fixed top-0 left-0 z-40">
            <div className="absolute w-full h-full bg-black/80 md:bg-black/40 z-0" />
            <div className="bg-[#141414] w-[364px] h-fit p-[24px] rounded-[8px] overflow-hidden text-white flex flex-col gap-[24px] z-10">
                <h1 className="font-glysa text-[24px] font-medium">
                    {name ? "Edit" : "Add"} contact
                </h1>

                <div className="flex flex-row items-center gap-[16px]">
                    <Image
                        src={photoURL || "/assets/profiles/Default.png"}
                        width={88}
                        height={88}
                        alt="Profile Picture"
                        className="rounded-full overflow-hidden"
                    />

                    <div className="flex flex-row items-center relative">
                        <button className="flex flex-row items-center gap-[8px] bg-[#282828] pl-[12px] pr-[16px] py-[8px] rounded-[8px] overflow-hidden active:scale-[0.95] transition-all active:opacity-80">
                            <Image
                                src={`/assets/${photoURL ? "Change" : "Add"}.svg`}
                                width={24}
                                height={24}
                                alt="Add Icon"
                            />
                            <span className="text-[14px] leading-[17.5px]">
                                {photoURL ? "Change" : "Add"} picture
                            </span>
                        </button>

                        {photoURL && (
                            <button className="flex flex-row items-center gap-[8px] bg-[#282828] p-[8px] ml-[8px] rounded-[8px] overflow-hidden active:scale-[0.95] transition-all active:opacity-80">
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
                    />
                </label>


                <div className="flex flex-row items-center gap-[8px] pt-[24px] justify-end">
                    <button
                        className="px-[16px] py-[11px] rounded-[8px] overflow-hidden hover:bg-[#2D2D2D] transition-all w-full md:w-fit"
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-[16px] py-[11px] rounded-[8px] overflow-hidden bg-[#262626] hover:bg-[#2D2D2D] transition-all w-full md:w-fit"
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}