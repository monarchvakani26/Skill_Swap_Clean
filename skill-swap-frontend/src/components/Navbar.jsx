"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">{children}</svg>
)

const icons = {
  Search: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  ),
  Bell: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.73 21a2 2 0 01-3.46 0" />
    </>
  ),
  Message: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  ),
  User: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </>
  ),
  Star: (
    <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),
  Plus: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  ),
  Menu: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  ),
  X: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  ),
  Settings: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
  LogOut: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  )
}

function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false)
  // const [isProfileOpen, setIsProfileOpen] = useState(false)

  // const user = {
  //   // name: "Alex Johnson",
  //   // avatar: "/placeholder.svg?height=40&width=40",
  //   // rating: 4.8,
  //   // skillsOffered: 3,
  // }

  const navigationLinks = [
    { name: "Browse", icon: "Search" },
    { name: "My Skills", icon: "Star" },
    { name: "Messages", icon: "Message"},
    { name: "Post Skill", icon: "Plus" },
  ]
  const navigate = useNavigate()

  return (
    
    <nav className="bg-white border-b px-4 py-6 shadow-sm flex justify-between items-center">
      <div className="text-4xl font-bold flex items-center gap-2">
        <span className="text-2xl">🌟</span>
        <span>SkillSwap</span>
      </div>

      <div className="hidden md:flex items-center gap-4 ">
        {navigationLinks.map(({ name, icon, badge }) => (
          // <button key={name} className="relative text-sm flex items-center rounded-4xl py-3 px-3 gap-1 hover:bg-[#ffa7d2] ">
          <button key={name} className="relative text-sm flex items-center rounded-full py-3 px-3 gap-1 border border-transparent hover:bg-[#ffa7d2] hover:border-[#e278aa] transition-colors duration-200">

            <Icon>{icons[icon]}</Icon>
            {name}
            {badge && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        ))}




        <button className="relative hover:text-pink-500">
          <Icon>{icons.Bell}</Icon>
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            
          </span> */}
        </button>

        {/* <div className="relative">
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2">
            <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full border" />
            <span className="text-sm hidden lg:block">{user.name}</span>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded p-2 text-sm">
              <div className="border-b pb-2 mb-2">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.skillsOffered} skills offered</p>
              </div>
              <a href="#" className="flex items-center gap-2 py-1 hover:text-pink-500">
                <Icon className="h-4 w-4">{icons.User}</Icon> Profile
              </a>
              <a href="#" className="flex items-center gap-2 py-1 hover:text-pink-500">
                <Icon className="h-4 w-4">{icons.Settings}</Icon> Settings
              </a>
              <a href="#" className="flex items-center gap-2 py-1 text-red-600 hover:text-red-400">
                <Icon className="h-4 w-4">{icons.LogOut}</Icon> Sign Out
              </a>
            </div>
          )}
        </div> */}
                <div className="hidden md:flex items-center space-x-8">
          
               
          <button onClick={() => navigate("/register")}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-pink-600"
          >
            Sign In
          </button>
        </div>




        
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Icon className="h-6 w-6">{isOpen ? icons.X : icons.Menu}</Icon>
        </button>
      </div>
    </nav>
  )
}

export default Navbar;


















// "use client"

// import { useState } from "react"
// import { SearchIcon, MenuIcon, XIcon } from "./icons"
// import { useNavigate } from "react-router-dom"

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const navigate = useNavigate()

//   const navigationLinks = [
//     { name: "Browse", href: "#" },
//     { name: "Post Skill", href: "#" },
//   ]

//   return (
//     <nav className="bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 w-full z-50 text-xl">
//       <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//         <div className="flex items-center space-x-3 text-3xl font-bold">
//           <span className="text-pink-500 text-4xl">🌟</span>
//           <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg">SkillSwap</span>
//         </div>

//         <div className="hidden md:flex w-full max-w-2xl mx-6 relative">
//           <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
//             <SearchIcon className="w-6 h-6" />
//           </div>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search skills like 'guitar lessons', 'web design'..."
//             className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
//           />
//         </div>

//         <div className="hidden md:flex items-center space-x-8">
//           {navigationLinks.map((link) => (
//             <a key={link.name} href={link.href} className="hover:text-pink-500">
//               {link.name}
//             </a>
//           ))}

//           <button
//             onClick={() => navigate("/login")}
//             className="bg-pink-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-pink-600"
//           >
//             Sign In
//           </button>
//         </div>

//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
//           </button>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden px-6 py-6 bg-white border-t border-gray-200 text-lg">
//           <div className="flex flex-col space-y-6">
//             <div className="relative">
//               <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
//                 <SearchIcon className="w-6 h-6" />
//               </div>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search skills..."
//                 className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
//               />
//             </div>

//             {navigationLinks.map((link) => (
//               <a key={link.name} href={link.href} className="hover:text-pink-500">
//                 {link.name}
//               </a>
//             ))}

//             <button
//               onClick={() => navigate("/login")}
//               className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar






