import { Field, ObjectType } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { index, prop, Ref } from '@typegoose/typegoose'
import { Todo } from './todo.entity'

@ObjectType()
@index({ username: 1, email: 1 }, { unique: true })
export class User {
  @Field()
  readonly _id!: ObjectId

  @prop({ required: true })
  @Field()
  username!: string

  @prop({ required: true })
  @Field()
  email!: string

  @prop({ required: true, select: false })
  @Field()
  password!: string

  @prop({ default: Date.now })
  @Field(() => Date)
  createdAt!: Date

  @Field()
  active!: boolean

  @prop({ ref: () => Todo })
  @Field(() => [Todo])
  _todos?: Ref<Todo>[]
}