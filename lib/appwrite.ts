import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.react_native.aora',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID!,
    storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,

}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email: string, password: string, username: string) {
    try {
        const response = await account.create(ID.unique(), email, password, username)
        const avatar = avatars.getInitials(username)

        await signIn(email, password);
        const newUser = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.userCollectionId, ID.unique(), {
            email,
            username,
            avatar,
            accountId: response.$id
        })

        return newUser
    } catch (error) {
        console.log(error);
    }
}

export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) {
            return null
        }
        const currentUser = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)])
        if (!currentUser) {
            return null
        }

        return currentUser.documents[0]
    } catch (error) {
        throw new Error("");
    }
}