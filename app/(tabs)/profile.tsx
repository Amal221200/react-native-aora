import { FlatList } from 'react-native'
import { useContext } from 'react'
import EmptyState from '../../components/EmptyState'
import { getUserPosts } from "../../lib/posts"
import useAppwrite from "../../hooks/useAppwrite"
import VideoCard from '../../components/VideoCard'
import { StyledSafeAreaView, StyledText, StyledTouchableOpacity, StyledView } from '@/components/styledComponents'
import { Models } from 'react-native-appwrite'
import { SessionContext, TSessionContext } from '@/components/providers/SessionProvider'
import UserCard from '@/components/UserCard'

const Profile = () => {
  const { user, isLoading } = useContext(SessionContext) as TSessionContext
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id!))

  if(isLoading){
    <StyledSafeAreaView className="h-full bg-primary" />
  }

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <FlatList data={posts} keyExtractor={(item: Models.Document) => item.$id} renderItem={({ item: video }) => <VideoCard video={video} />} ListHeaderComponent={() => (
        <UserCard posts={posts?.length ?? 0} />
      )} ListEmptyComponent={() => (
        <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
      )}
      />
    </StyledSafeAreaView>
  )
}

export default Profile