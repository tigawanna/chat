import { useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import ChatForm from './components/ChatForm';
import { useChatsQuery, useNewChatSubscription} from './generated/graphql';





function App() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resul = useChatsQuery()
const result=useNewChatSubscription()

console.log("subsciption result======== ",result.data)

// const more=subscribeToMore({
//   document:NewChatDocument,
//   updateQuery: (prev, { subscriptionData  }) => {
//     if (!subscriptionData.data) return prev;
//     const newFeedItem = subscriptionData ;
//     //@ts-ignore
//     console.log("new feed data ===== ",newFeedItem.data.newChat )
//     console.log("prev is ===== ",prev)
//   return Object.assign({}, prev, {
//   data:{
//     chats:[newFeedItem,...prev.chats]
//       }
//     });
//   }
// })

// useEffect(() => {
// more()
// }, [])


 return (
    <div className="container">
     <h1>Home</h1>
     <div className="main">
     {
        result&&resul.data?.chats.map((item)=>{
        //  console.log(item)
         return(
           <Card key={item.id} m={item}/>
         )
       })
     }
     </div>
        <div className="footer">
         <ChatForm/>
        </div>
    </div>
  );
}

export default App;
