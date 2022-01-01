import styles from '../styles/Card.module.css'
import dayjs from 'dayjs';
import Link from 'next/link'
import { RegularChatFragment } from './../src/generated/graphql';


interface ChatProps{
  m:RegularChatFragment
}

 const Card:React.FC<ChatProps>=({m}) =>{
console.log(m)
return (
   <div  key={m.id} className={styles.card}>
     <div className={styles.cardheader}>
    <div className={styles.cardheaderid}></div>  

    <div className={styles.cardheaderid}>
    {    
    dayjs(m.createdAt).format('D MMM , YYYY h:mm A')
    }</div>  
    <div className={styles.cardheaderuser}>by: {} </div>
    </div>
    <div className={styles.cardmiddle}>
    <div className={styles.cardmiddlestart}></div>

  <div className={styles.cardmiddlecenter}>
     
    <p> {m.message}</p>
    </div>

 <div className={styles.cardmiddleend}>

 


    </div>
     </div>
      </div>

  )
}

export default Card