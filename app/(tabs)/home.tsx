import { FlatList, RefreshControl } from 'react-native'
import { useCallback, useState } from 'react'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from "../../lib/posts"
import useAppwrite from "../../hooks/useAppwrite"
import VideoCard from '../../components/VideoCard'
import { StyledSafeAreaView, } from '@/components/styledComponents'
import { Models } from 'react-native-appwrite'
import HomeHeader from '@/components/HomeHeader'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch } = useAppwrite(getAllPosts)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <FlatList data={posts} keyExtractor={(item: Models.Document) => item.$id}
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