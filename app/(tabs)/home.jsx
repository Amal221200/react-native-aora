import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from "../../lib/posts"
import useAppwrite from "../../hooks/useAppwrite"
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: trendingPosts } = useAppwrite(getLatestPosts)
  // console.log(trendingPosts);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 4000)
  }, [])

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList data={posts} keyExtractor={(item) => item.$id} renderItem={({ item: video }) => <VideoCard video={video} />} ListHeaderComponent={() => (
        <View className="my-6 space-y-6 px-4">
          <View className="mb-6 flex-row items-start justify-between gap-1">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
              <Text className="font-psemibold text-2xl text-white">JSMastery</Text>
            </View>
            <View className='mt-1.5'>
              <Image source={images.logoSmall} className="h-10 w-9" resizeMode='contain' />
            </View>
          </View>

          <SearchInput placeholder="Search for a video" />
          <View className="w-full flex-1 pb-8 pt-5">
            <Text className="mb-3 font-pregular text-lg text-gray-100">
              Latest Videos
            </Text>
          </View>

          <Trending posts={trendingPosts} />
        </View>
      )} ListEmptyComponent={() => (
        <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
      )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home