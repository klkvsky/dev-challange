import { ContactListItem } from "./components/contactListItem"
import { PrismaClient } from "@prisma/client"
import Header from "./components/header"

const prisma = new PrismaClient()

export default async function Home() {
  const contacts = await prisma.contact.findMany()

  return (
    <main className='w-screen min-h-screen dark:bg-[#141414] flex flex-col items-center overflow-hidden font-lexend px-[12px] md:px-0'>
      <div className="border-x border-x-[#282828] max-w-[768px] w-full pt-[36px] md:pt-[96px] min-h-screen border-opacity-20 dark:border-opacity-100">
        <Header />

        <div
          className="flex flex-col px-[12px] py-[8px] md:px-[24px] md:py-[12px] w-full"
        >
          {contacts.map((contact, index) => (
            <ContactListItem
              key={index}
              contact={contact}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
