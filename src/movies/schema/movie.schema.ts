import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Movie {
    @Prop()
    image: string;
    @Prop()
    title: string;
    @Prop()
    year: number;
}
export const MovieSchema = SchemaFactory.createForClass(Movie);