import { Models } from "react-native-appwrite";

export interface Post extends Models.Document {
    title: string;
    thumbnail: string;
    video: string;
    prompt: string;
    creator: User;
}

export interface User extends Models.Document {
    email: string,
    username: string,
    avatar: string,
    accountId: string
}

export interface Bookmark extends Models.Document {
    video: Post,
    user: User
}