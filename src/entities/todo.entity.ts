import { Field, ObjectType } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { index, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.entity'

@ObjectType()
@index({ content: 1 }, { unique: true })
export class Todo {
  @Field()
  readonly _id!: ObjectId

  @prop({ default: Date.now })
  @Field(() => Date)
  createdAt!: Date

  @prop()
  @Field(() => Date)
  updatedAt!: Date

  @prop()
  @Field()
  content!: string

  @prop({ default: false })
  @Field()
  done!: boolean

  @prop({ ref: () => User })
  @Field(() => User, { nullable: true })
  _user?: Ref<User>
}