import { MaxLength, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class TodoDto {
  @Field()
  @MaxLength(300)
  @MinLength(1)
  content: string
}