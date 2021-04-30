import { Field, ObjectType } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { index, prop } from '@typegoose/typegoose'

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
}