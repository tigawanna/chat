import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';


@ObjectType()
export class Chat {
  @Field(()=>String,{nullable:false})
  id: ObjectId;

  @Field(()=>String,{nullable:false})
  @Property({ })
  message: string;

  // @Field(()=>String,{nullable:false})
  // @Property()
  // user: string;


}
const schemaOptions = { schemaOptions: { timestamps: { createdAt: true ,} } };
//@ts-ignore
export const ChatModel = getModelForClass(Chat,schemaOptions);