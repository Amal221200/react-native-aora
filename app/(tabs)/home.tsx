import { FlatList, RefreshControl } from 'react-native'
import { useCallback, useContext, useState } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from "../../lib/posts"
import useAppwrite from "../../hooks/useAppwrite"
import VideoCard from '../../components/VideoCard'
import { StyledImage, StyledSafeAreaView, StyledText, StyledView } from '@/components/styledComponents'
import { Models } from 'react-native-appwrite'
import { SessionContext, TSessionContext } from '@/components/providers/SessionProvider'

const Home = () => {
  const { user } = useContext(SessionContext) as TSessionContext
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: trendingPosts } = useAppwrite(getLatestPosts)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <FlatList data={posts} keyExtractor={(item: Models.Document) => item.$id} renderItem={({ item: video }) => <VideoCard video={video} />} ListHeaderComponent={() => (
        <StyledView className="my-6 space-y-6 px-4">
          <StyledView className="mb-6 flex-row items-start justify-between gap-1">
            <StyledView>
              <StyledText className="font-pmedium text-sm text-gray-100">Welcome Back</StyledText>
              <StyledText className="font-psemibold text-2xl text-white">
                {user?.username}
              </StyledText>
            </StyledView>
            <StyledView className='mt-1.5'>
              <StyledImage source={images.logoSmall} className="h-10 w-9" resizeMode='contain' />
            </StyledView>
          </StyledView>

          <SearchInput />
          <StyledView className="w-full flex-1 pb-8 pt-5">
            <StyledText className="mb-3 font-pregular text-lg text-gray-100">
              Latest Videos
            </StyledText>
          </StyledView>

          <Trending posts={trendingPosts ?? []} />
        </StyledView>
      )} ListEmptyComponent={() => (
        <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
      )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </StyledSafeAreaView>
  )
}

export default Home