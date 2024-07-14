import { React, useContext, useState } from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { GiFeather } from "react-icons/gi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSclice';
import axios from 'axios';
// import { UserContext } from "../contaxt/UserContext.jsx";
import { URL } from "../url"

function Header() {
  const path = useLocation().pathname;
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [prompt,setPrompt]=useState("")

  // const { user } = useContext(UserContext)
  // const { setUser } = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
      // console.log(res)
      // console.log(user)
      localStorage.removeItem("user");
      // window.location.reload();
      navigate("/login")

    }
    catch (err) {
      console.log(err)
    }
  }


  

  return (
    <Navbar className='border-b-2 dark:bg-[#121212] '>

      <Link
        to='/'
        className='self-center flex  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >

        <GiFeather />
        <span className='py-1  rounded-lg text-red font-sans '>
          CampusConnect
        </span>
      </Link>
      <form onSubmit={(e) =>{e.preventDefault(); navigate(prompt ? "?search=" + prompt : navigate("/"))}}>
        {
          path === "/" &&

          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='w-28 lg:w-full '
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        }
      </form>





   




      <div className='flex gap-2 md:order-2 '>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
              {user.username}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Link to={"/profile/"+user._id}>
              <Dropdown.Item >Profile</Dropdown.Item>
            </Link>
            <Link to={"/createpost"}>
              <Dropdown.Item>Write</Dropdown.Item>
            </Link>
            <Link to={"/myblogs/"+user._id}>

              <Dropdown.Item>My blogs</Dropdown.Item>
            </Link>
            <Dropdown.Item className=' sm:hidden' onClick={() => dispatch(toggleTheme())}>Change theme to {theme === 'light' ? "dark" : "light"}</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/aboutus"} as={'div'}>
          <Link to='/aboutus'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact"} as={'div'} >
          <Link to='/contact'>Contact</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

// #bg-[#1D2125] 
// #bg-[#1D2125] 
// #bg-[#1D2125] 
// #bg-[#1D2125] 
// #bg-[#1D2125] 
export default Header


