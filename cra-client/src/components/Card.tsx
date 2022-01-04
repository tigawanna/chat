import "./card.css";
import dayjs from "dayjs";
import {
  RegularChatFragment,
  useDeleteChatMutation,
} from "../generated/graphql";
import { FaTrash } from "react-icons/fa";

interface ChatProps {
  m: RegularChatFragment;
}

const Card: React.FC<ChatProps> = ({ m }) => {
  const [deleteChat] = useDeleteChatMutation();

  return (
    <div key={m.id} className="card">
      <div className="cardheader">
        <div className="cardheaderid"></div>

        <div className="cardheaderid">
          {dayjs(m.createdAt).format("D MMM , YYYY h:mm A")}
        </div>
        <div className="cardheaderuser">by: {} </div>
      </div>
      <div className="cardmiddle">
        <div className="cardmiddlestart">
          <FaTrash
            onClick={() => {
              deleteChat({
                variables: { id: m.id },
                update: (cache, { data }) => {
                  //remove deletedchats from cache
                  const normalizedId = cache.identify({
                    id: m.id,
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
          <p> {m.message}</p>
        </div>

        <div className="cardmiddleend"></div>
      </div>
    </div>
  );
};

export default Card;
