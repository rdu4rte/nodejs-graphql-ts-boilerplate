import { IsBoolean, IsOptional, MaxLength, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class TodoDto {
  @Field({ nullable: true })
  @MaxLength(300)
  @MinLength(1)
  content: string

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean
}