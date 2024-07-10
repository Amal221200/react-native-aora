import { FlatList, RefreshControl } from 'react-native'
import { useCallback, useState } from 'react'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { StyledSafeAreaView, } from '@/components/styledComponents'
import HomeHeader from '@/components/HomeHeader'
import { Post } from '@/lib/types'
import useFetchPosts from '@/hooks/posts/useFetchPosts'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { posts, refetch } = useFetchPosts()

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <FlatList data={posts} keyExtractor={(item: Post) => item.$id}
        renderItem={({ item: video }) => <VideoCard video={video} />}
        ListHeaderComponent={() => (
          <HomeHeader />
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        maxToRenderPerBatch={5}
      />
    </StyledSafeAreaView>
  )
}

export default Home