import { FlatList, RefreshControl } from 'react-native'
import { useCallback, useState } from 'react'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { StyledSafeAreaView, } from '@/components/styledComponents'
import UserCard from '@/components/UserCard'
import { Post } from '@/lib/types'
import useFetchUserPosts from '@/hooks/posts/useFetchUserPosts'

const Profile = () => {
  const { posts, refetch } = useFetchUserPosts()
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <FlatList data={posts} keyExtractor={(item: Post) => item.$id} renderItem={({ item: video }) => <VideoCard video={video} />} ListHeaderComponent={() => (
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