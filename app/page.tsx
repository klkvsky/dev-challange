import { ContactListItem } from "./components/contactListItem"
import { ContactType } from "./types"
import Header from "./components/header"

export default function Home() {
  const placeholder: ContactType[] = [
    {
      "photoURL": "/assets/profiles/Timothy.png",
      "name": "Timothy Lewis",
      "phone": "+36 01 234 5678",
      "isMuted": false,
      "isFavorite": true
    },
    {
      "photoURL": "/assets/profiles/Sarah.png",
      "name": "Sarah Wright",
      "phone": "+36 01 234 5678",
      "isMuted": false,
      "isFavorite": true
    },
    {
      "photoURL": "/assets/profiles/Lucy.png",
      "name": "Lucy Jones",
      "phone": "+36 01 234 5678",
      "isMuted": false,
      "isFavorite": true
    },
    {
      "photoURL": "/assets/profiles/Jake.png",
      "name": "Jake Perez",
      "phone": "+36 01 234 5678",
      "isMuted": false,
      "isFavorite": true
    },
    {
      "photoURL": "/assets/profiles/Adebayo.png",
      "name": "Adebayo Rodriguez",
      "phone": "+36 01 234 5678",
      "isMuted": false,
      "isFavorite": true
    }
  ]

  return (
    <main className='w-screen min-h-screen dark:bg-[#141414] flex flex-col items-center overflow-hidden font-lexend px-[12px] md:px-0'>
      <div className="border-x border-x-[#282828] max-w-[768px] w-full pt-[36px] md:pt-[96px] min-h-screen border-opacity-20 dark:border-opacity-100">
        <Header />
        
        <div
          className="flex flex-col px-[12px] py-[8px] md:px-[24px] md:py-[12px] w-full"
        >
          {placeholder.map((contact, index) => (
            <ContactListItem
              key={index}
              {...contact}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
