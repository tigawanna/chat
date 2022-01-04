import './card.css'
import dayjs from 'dayjs';
import { RegularChatFragment } from '../generated/graphql';


interface ChatProps{
  m:RegularChatFragment
}

const Card:React.FC<ChatProps>=({m}) =>{
  return (
   <div  key={m.id} className="card">
     <div className="cardheader">
    <div className="cardheaderid"></div>  

    <div className="cardheaderid">
    {    
   dayjs(m.createdAt).format('D MMM , YYYY h:mm A')
    }</div>  
    <div className="cardheaderuser">by: {} </div>
    </div>
    <div className="cardmiddle">
    <div className="cardmiddlestart"></div>

  <div className="cardmiddlecenter">
     
    <p> {m.message}</p>
    </div>

 <div className="cardmiddleend">

 


    </div>
     </div>
      </div>

  )
}

export default Card