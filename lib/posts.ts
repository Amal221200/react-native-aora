import { ImagePickerAsset } from "expo-image-picker";
import { formDataProps } from "@/app/(tabs)/create";
import { ImageGravity } from 'react-native-appwrite'
import { ID } from "react-native-appwrite";
import { Query } from "react-native-appwrite";
import { appWriteConfig, databases, storage } from "./appwrite";

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, [Query.orderDesc('$createdAt')])
        return posts.documents
    } catch (error) {
        console.log(error);

    }
}

export async function getQueryPosts(query: string) {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, [Query.search('title', query), Query.orderAsc('title')])
        return posts.documents
    } catch (error) {
        console.log(error);
    }
}

export async function getUserPosts(userId: string) {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, [Query.equal('creator', userId), Query.orderDesc('$createdAt')])
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


async function getFilePreview(fileId: string, type: 'image' | 'video') {
    let fileUrl

    if (type === 'image') {
        fileUrl = storage.getFilePreview(appWriteConfig.storageId, fileId, 2000, 2000, ImageGravity.Top, 100)
    } else {
        fileUrl = storage.getFileView(appWriteConfig.storageId, fileId)
    }

    return fileUrl
}

async function uploadFile(file: ImagePickerAsset, fileType: 'image' | 'video') {
    const { mimeType, fileName, uri, fileSize } = file;
    const response = await storage.createFile(
        appWriteConfig.storageId,
        ID.unique(),
        {
            name: fileName!,
            type: mimeType!,
            uri,
            size: fileSize!
        }
    )

    const fileUrl = await getFilePreview(response.$id, fileType)
    return fileUrl
}


export async function createPost(form: formDataProps & { creator: string }) {

    try {
        let thumbnailURL;
        let videoURL;
        const [thumbnailResponse, videoResponse] = await Promise.allSettled([uploadFile(form.thumbnail!, 'image'), uploadFile(form.video!, 'video')]);

        if (thumbnailResponse.status === 'fulfilled') {
            thumbnailURL = thumbnailResponse.value
        }
        if (videoResponse.status === 'fulfilled') {
            videoURL = videoResponse.value
        }

        const newPost = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailURL,
            video: videoURL,
            prompt: form.prompt,
            creator: form.creator
        })

        // return newPost
    } catch (error) {
        console.log(error);
    }
}