
import './App.css';
import Card from './components/Card';
import ChatForm from './components/ChatForm';
import { NewChatDocument, useChatsQuery} from './generated/graphql';
import { useEffect } from 'react';
import { useState } from 'react';


function App() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {subscribeToMore ,...result} = useChatsQuery()

const[sending,setSending]=useState(false)

const subscribeToNewComments=() =>{
  subscribeToMore({
    document: NewChatDocument,
     updateQuery: (prev, { subscriptionData  }) => {
      if (!subscriptionData.data||!sending){
        // console.log("no subscription data ===== ",prev)
        return prev
      }
      // const newFeedItem = subscriptionData.data.commentAdded;
      //@ts-ignore
      const newFeedItem= subscriptionData.data.newChat;
      console.log("new feed data ===== ",newFeedItem)
      console.log("prev datad ===== ",prev)
      const newObj =Object.assign({}, prev, {
  
      chats: [newFeedItem,...prev.chats]
      
      });
    //  console.log("new object after merging ===== ",newObj)
      return newObj

    }

    
  })
}

useEffect(() => {
subscribeToNewComments()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


 return (
    <div className="container">
     <h1>Home</h1>
     <div className="main">
     {
        result&&result.data?.chats.map((item)=>{
        //  console.log(item)
         return(
           <Card key={item.id} m={item}/>
         )
       })
     }
     </div>
        <div className="footer">
        <ChatForm setSending={setSending}/>
        </div>
    </div>
  );
}

export default App;
