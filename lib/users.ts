import { ID, Query } from "react-native-appwrite";
import { account, appWriteConfig, avatars, databases } from "./appwrite";

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

export async function signOut() {
    try {
        const session = await account.deleteSession('current');
        return session
    } catch (error) {
        console.log(error);
    }
}