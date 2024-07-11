import { Account, Avatars, Client, Databases, Storage } from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.react_native.aora',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID!,
    bookmarkCollectionId: process.env.EXPO_PUBLIC_APPWRITE_BOOKMARK_COLLECTION_ID!,
    storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
}

// Init your React Native SDK
export const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);