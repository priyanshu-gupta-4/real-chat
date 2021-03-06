import React , {useEffect,useState} from 'react'
import {Link} from "react-router-dom"
import {Avatar} from "@material-ui/core"
import './SidebarChat.css'
import {useParams} from "react-router-dom"
import db from './firebase'
export default function SidebarChat({addNewChat,id,name}) {
    const [seed, setSeed] = useState("")
    const [messages, setMessages] = useState([])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

   
    useEffect(() => {
        if(id){
            db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp","desc").onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            ))
        }
    }, [id])

    const createChat = () => {
        const roomName = prompt("Enter Room Name")

        if(roomName){
            db.collection("rooms").add({
                name:roomName
            })
        }
    }
    return !addNewChat?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}
