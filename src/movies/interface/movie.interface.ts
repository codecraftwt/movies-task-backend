import { Document } from "mongoose";

export interface IMovie extends Document {
    image: string;
    title: string;
    year: number;
}
