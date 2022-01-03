import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/ChatForm.module.css";
import {
   useCreateChatMutation,
   ChatsDocument, ChatsQuery } from './../src/generated/graphql';

interface ChatFormProps {

}

export const ChatForm: React.FC<ChatFormProps> = ({}) => {
  const [chatError, setError] = useState();
  const [input, setInput] = useState("");

  const [textBack]=useCreateChatMutation()

  const router = useRouter();

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
    <div className={styles.container}>
      <form className={styles.theform}>
       <div className={styles.inputgroup}>
         <input
            className={chatError ? styles.theinputerror : styles.theinput}
            id="usernameOrEmail"
            placeholder="username or email"
            onChange={handleChange}
            value={input}
          />
       <button className={styles.formbutton} onClick={handleSubmit}>
          send
        </button>
        </div>
        <span className={styles.inputerror}>error:{chatError}</span>

     
      </form>
    </div>
  );
};
