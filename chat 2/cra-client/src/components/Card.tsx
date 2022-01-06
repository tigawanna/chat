import "./card.css";
import dayjs from "dayjs";
import {
  RegularChatFragment,
  useDeleteChatMutation,
} from "../generated/graphql";
import { FaTrash,FaEdit,FaCheck } from "react-icons/fa";
import { useState } from 'react';
import { useUpdateChatMutation } from './../generated/graphql';

interface ChatProps {
  m: RegularChatFragment;
}

const Card: React.FC<ChatProps> = ({ m }) => {
  const [deleteChat] = useDeleteChatMutation();
  const [editing, setEditing] = useState(false)  
  const [input, setInput] = useState(m.message);
  const [updateChat]=useUpdateChatMutation()

const handleChange:React.ChangeEventHandler<HTMLInputElement> = (evt) => {
  const value = evt.target.value;
  setInput(value);
  };

const startEditing=()=>{
setEditing(true)
}
const stopEditing=()=>{
setEditing(false)
console.log(input)
updateChat({variables:{id:m._id,input}})
.then((e) => console.log("update chat response========= ", e))
.catch((e) => console.log("update chat error========= ", e));

}
  return (
    <div key={m._id} className="card">
      <div className="cardheader">
        <div className="cardheaderid"></div>

        <div className="cardheaderid">
        {editing?
          <input
            className= "theinput"
            id="chat"
            placeholder="type.."
            onChange={handleChange}
            value={input}
          />:<p>{m.message}</p>}
        </div>
        <div className="cardheaderuser">by: {} </div>
      </div>
      <div className="cardmiddle">
        <div className="cardmiddlestart">
          <FaTrash
            onClick={() => {
              deleteChat({
                variables: { id: m._id },
                update: (cache, { data }) => {
                  //remove deletedchats from cache
                  const normalizedId = cache.identify({
                    id: m._id,
                    __typename: "Chat",
                  });
                  cache.evict({ id: normalizedId });
                  cache.gc();
                },
              })
                .then((e) => console.log("delete chat response========= ", e))
                .catch((e) => console.log("delete chat error========= ", e));
            }}
          />
       
        </div>

        <div className="cardmiddlecenter">
          <div>{dayjs(m.createdAt).format("D MMM , YYYY h:mm A")}</div>
          <div>{dayjs(m.updatedAt).format("D MMM , YYYY h:mm A")}</div>
        </div>

        <div className="cardmiddleend">
          {editing?
          <FaCheck onClick={()=>stopEditing()}/>
          :
          <FaEdit onClick={()=>startEditing()}/>
          }</div>
      </div>
    </div>
  );
};

export default Card;
