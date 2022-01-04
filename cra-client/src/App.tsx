import './App.css';
import Card from './components/Card';
import ChatForm from './components/ChatForm';
import { useChatsQuery, useNewChatSubscription } from './generated/graphql';




function App() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { loading, error, data } = useChatsQuery()
const result=useNewChatSubscription()

console.log("subsciption result======== ",result)


 return (
    <div className="container">
     <h1>Home</h1>
     <div className="main">
     {
        data&&data.chats.map((item)=>{
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
