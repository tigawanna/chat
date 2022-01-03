import type { NextPage } from 'next'
import { ChatForm } from '../components/ChatForm';
import { RegularChatFragment,
      useChatsQuery } from '../src/generated/graphql';
import styles from '../styles/Home.module.css'
import Card from './../components/Card';

interface ChatProps{
  m:RegularChatFragment
}


const Home: NextPage<ChatProps> = () => {
const { loading, error, data } = useChatsQuery()
  console.log(data,error)
  console.log(error?.message)
  return (
    <div className={styles.container}>
     <h1>Home</h1>
     <div className={styles.main}>
     {
       data&&data.chats.map((item)=>{
        //  console.log(item)
         return(
           <Card key={item.id} m={item}/>
         )
       })
     }
     </div>
        <div className={styles.footer}>
         <ChatForm/>
        </div>
    </div>
  )
}

export default Home
