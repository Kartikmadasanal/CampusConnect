import axios from 'axios';
import { Button, Textarea } from 'flowbite-react';
// import { useContext } from 'react';
// import { UserContext } from '../contaxt/UserContext';
import { URL } from '../url';


function Comment({ c, post }) {
    // console.log(c._id)


    // const { user } = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem("user"));

    const deleteComment = async (id) => {
        try {
            await axios.delete(URL + "/api/comments/" + id, { withCredentials: true })
            window.location.reload(true)
        }
        catch (err) {
            console.log(err)
        }
    }


    return (

        <div>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs truncate'>
                    @{c.author}
                </span>
                <div className="flex space-x-2 text-sm">
                    <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
                    <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
                </div>
            </div>
            <p className='text-gray-500 pb-2'>{c.comment}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>



                {user?._id === c?.userId ?
                    <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer" onClick={() => deleteComment(c._id)}>Delete</p>
                    </div> : ""}

            </div>
        </div>

    );
}

export default Comment;