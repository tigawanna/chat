import { Chat, ChatModel } from "../entities/Chat";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  PubSub,
  Publisher,
  Root,
  Subscription,
} from "type-graphql";

import { HydratedDocument } from "mongoose";
const NEWCHAT = "NEW_CHAT_ADDED";

@Resolver(() => Chat)
export class  ChatResolver {

  //query all users
  @Query(() => [Chat])
  async chats(): Promise<Chat[]> {
    const chats = await ChatModel.find({});
    // console.log("user returned========",users)
    return chats;
  }

  
  //create new post
  @Mutation(() => Chat)
  async createChat(
    @Arg("input") input: String,
    @PubSub(NEWCHAT) publish: Publisher<Chat>
  ): Promise<Chat> {
    const chat: HydratedDocument<Chat> = new ChatModel({
      message: input,
   });
     await chat.save().then(async (e) => {
      console.log("user response====== ", e);
      await publish(e);
    })
    // .catch(e=>
    //  console.log("error response====== ", e)
    // )
    console.log(chat)
    //@ts-ignore
    return chat;
  }

  //delete a post
@Mutation(()=>Boolean)
async deleteChat(
@Arg('id',()=>String) id,
) :Promise<boolean>{

await ChatModel.findByIdAndDelete({_id:id})
.catch(e=>{
  console.log("is delete error ======",e)
  return false
})
return true;

}

  //delete a post
  @Mutation(()=>Chat)
  async updateChat(
  @Arg('id',()=>String) id,
  @Arg("input") input: String,
  ) :Promise<Chat>{
  const updatedChat= await ChatModel.findByIdAndUpdate(
    {_id:id},
    { message:input}, 
    {new: true}
  )
  .catch(e=>{
    console.log("is delete error ======",e)

  })
 return updatedChat as Chat
  }

//subscribe to createUser mutation 
  @Subscription({ topics: NEWCHAT })
  newChat(@Root() { id,message,createdAt,updatedAt}): Chat {
    return { id, message,createdAt,updatedAt};
  }

  
}
