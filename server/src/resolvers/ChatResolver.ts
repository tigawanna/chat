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

//subscribe to createUser mutation 
  @Subscription({ topics: NEWCHAT })
  userAdded(@Root() { id,message}): Chat {
    return { id, message};
  }

  
}
