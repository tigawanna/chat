import './card-form.css'
import React, { useState } from "react";
import {
   useCreateChatMutation,
   ChatsDocument, ChatsQuery } from '../generated/graphql';

   interface ChatFormProps {
    setSending:React.Dispatch<React.SetStateAction<boolean>>
  }

 const ChatForm: React.FC<ChatFormProps> = ({setSending}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [input, setInput] = useState("");
  

  const [textBack]=useCreateChatMutation()

 const handleChange = (evt: any) => {
    const value = evt.target.value;
    //@ts-ignore
    setInput(value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(input);
    setSending(true)
    textBack(
      {
        variables:{input},
        update: (store, { data }) => {
          // you could wrap this in a try/catch
          const chatData = store.readQuery<ChatsQuery>({
            query: ChatsDocument
          });
          // console.log("chat cache========== ",chatData)
         store.writeQuery<ChatsQuery>({
            query: ChatsDocument,
            data: {
              chats: [...chatData!.chats, data!.createChat]
            }
          });
        }
      })

  };
  return (
    <div className="container">
      <form className="theform">
       <div className="inputgroup">
         <input
            className= "theinput"
            id="chat"
            placeholder="type.."
            onChange={handleChange}
            value={input}
          />
         <button className="formbutton" onClick={handleSubmit}>
          send
        </button>
        </div>
       </form>
    </div>
  );
};

export default ChatForm
