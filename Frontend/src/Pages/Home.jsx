import { useContext, useEffect, useState } from "react";
import PostData from '../Components/PostData';
import Categorycards from '../Components/Categorycards';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import FooterBar from '../Components/Footer';
// import { UserContext } from "../contaxt/UserContext";
import Login from "./Login";
import Loader from '../Components/Lodear'
// import { UserContextProvider } from "../contaxt/UserContext"

import axios from "axios";
import { URL } from "../url";

function Home() {

  // const { user } = useContext(UserContext); 
  // const user =localStorage.getItem("user");
	// console.log(user);



  const { search } = useLocation()
  // console.log(search)
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/posts/" + search)
      // console.log(res.data)
      setPosts(res.data)
      // console.log(res)
      if (res.data.length === 0) {
        setNoResults(true)
      }
      else {
        setNoResults(false)
      }
      setLoader(false)

    }
    catch (err) {
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  // useEffect(() => {
  //   getUser()

  // }, [])
  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", { withCredentials: true })
      // console.log(res.data)
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location = "/";

    }
    catch (err) {
      console.log(err)
    }
  }
//  console.log(user)
    return (

      <div>
        <Header />

        <div className='flex flex-col items-center justify-center flex-nowrap '>
          <Categorycards />
        </div>
        <div className="px-4 py-5 md:px-[200px] min-h-[80vh]">

          {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResults ?
            posts.map((post) => (

              <Link key={post._id} to={`/posts/post/${post._id}`}>
                <PostData post={post} />
              </Link>


            )) : <h3 className="text-center font-bold mt-16">No posts available</h3>}
        </div>

        <FooterBar />
      </div>

    )
  }



export default Home
