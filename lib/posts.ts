import { appWriteConfig, databases } from "./appwrite";

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.videoCollectionId)
        return posts.documents
    } catch (error) {
        console.log(error);

    }
}