import './card-form.css'
import React, { useState } from "react";

import {
   useCreateChatMutation,
   ChatsDocument, ChatsQuery } from '../generated/graphql';

interface ChatFormProps {
}
 const ChatForm: React.FC<ChatFormProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatError, setError] = useState();
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
    
    }
      

      )
    .then(e=>console.log("add chat response========= ",e))
  };
  return (
    <div className="container">
      <form className="theform">
       <div className="inputgroup">
         <input
            className={chatError ? "theinputerror" : "theinput"}
            id="usernameOrEmail"
            placeholder="username or email"
            onChange={handleChange}
            value={input}
          />
       <button className="formbutton" onClick={handleSubmit}>
          send
        </button>
        </div>
        <span className="inputerror">error:{chatError}</span>

     
      </form>
    </div>
  );
};

export default ChatForm
