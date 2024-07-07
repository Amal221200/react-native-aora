import { FlatList, RefreshControl } from 'react-native'
import { useCallback, useContext, useState } from 'react'
import EmptyState from '../../components/EmptyState'
import { getUserPosts } from "../../lib/posts"
import useAppwrite from "../../hooks/useAppwrite"
import VideoCard from '../../components/VideoCard'
import { StyledSafeAreaView, } from '@/components/styledComponents'
import { Models } from 'react-native-appwrite'
import { SessionContext, TSessionContext } from '@/components/providers/SessionProvider'
import UserCard from '@/components/UserCard'

const Profile = () => {
  const { user, isLoading } = useContext(SessionContext) as TSessionContext
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user?.$id!))
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])
  
  if (isLoading) {
    return <StyledSafeAreaView className="h-full bg-primary" />
  }

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <FlatList data={posts} keyExtractor={(item: Models.Document) => item.$id} renderItem={({ item: video }) => <VideoCard video={video} />} ListHeaderComponent={() => (
        <UserCard posts={posts?.length ?? 0} />
      )} ListEmptyComponent={() => (
        <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
      )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        maxToRenderPerBatch={5}
      />
    </StyledSafeAreaView>
  )
}

export default Profile