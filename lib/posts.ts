import { Query } from "react-native-appwrite";
import { appWriteConfig, databases } from "./appwrite";

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.videoCollectionId)
        return posts.documents
    } catch (error) {
        console.log(error);

    }
}

export async function getQueryPosts(query: string) {
    try {        
        const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, [Query.search('title', query)])
        return posts.documents
    } catch (error) {
        console.log(error);
    }
}

export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)])
        return posts.documents
    } catch (error) {
        console.log(error);

    }
}