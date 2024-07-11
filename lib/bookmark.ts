import { ID, Query } from "react-native-appwrite";
import { appWriteConfig, databases } from "./appwrite";
import { Bookmark } from "./types";

export async function getBookmarkedPosts(userId: string) {
    try {
        const posts = await databases.listDocuments<Bookmark>(appWriteConfig.databaseId, appWriteConfig.bookmarkCollectionId, [Query.equal('user', userId), Query.orderDesc('$createdAt')])

        return posts.documents
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}

export async function toggleBookmark(userId: string, videoId: string, bookmarked: boolean) {
    try {
        let post
        if (bookmarked) {
            const b = await getBookmarkedPost(userId, videoId)
            post = await databases.deleteDocument(appWriteConfig.databaseId, appWriteConfig.bookmarkCollectionId, b.$id)
        } else {
            post = await databases.createDocument<Bookmark>(appWriteConfig.databaseId, appWriteConfig.bookmarkCollectionId, ID.unique(), {
                user: userId,
                video: videoId
            })
        }

        return post
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}

export async function getBookmarkedPost(userId: string, videoId: string) {
    try {
        const posts = await databases.listDocuments<Bookmark>(appWriteConfig.databaseId, appWriteConfig.bookmarkCollectionId, [Query.equal('user', userId), Query.equal('video', videoId)])
        return posts.documents[0]
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}

export async function getBookmarked(userId: string, videoId: string) {
    try {
        const posts = await databases.listDocuments<Bookmark>(appWriteConfig.databaseId, appWriteConfig.bookmarkCollectionId, [Query.equal('user', userId), Query.equal('video', videoId)])
        return posts.documents[0] ? true : false
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}