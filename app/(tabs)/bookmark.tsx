import BookmarkHeader from '@/components/BookmarkHeader'
import EmptyState from '@/components/EmptyState'
import { StyledSafeAreaView } from '@/components/styledComponents'
import VideoCard from '@/components/VideoCard'
import useFetchBookMarks from '@/hooks/bookmark/useFetchBookmarks'
import { Post } from '@/lib/types'
import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'

const BookMark = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { bookmarks, refetch } = useFetchBookMarks()

  const searchResults = useMemo(() => bookmarks?.filter((bookmark) => bookmark.video.title.toLowerCase().includes(searchText.toLowerCase())), [searchText, bookmarks])
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return (
    <StyledSafeAreaView className="h-full bg-primary">
      <FlatList data={searchResults?.map(bookmark => bookmark.video)} keyExtractor={(item: Post) => item.$id}
        renderItem={({ item: video }) => <VideoCard video={video} />}
        ListHeaderComponent={() => (
          <BookmarkHeader searchText={searchText} setSearchText={(value) => setSearchText(value)} />
        )}
        ListEmptyComponent={() => (
          <EmptyState action={() => { 
            router.replace('/home') 
            setSearchText('')
          }} title="No Videos Found" subtitle="Couldn't find the video in the bookmark" text='Go back to HomePage' />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        maxToRenderPerBatch={5}
      />
    </StyledSafeAreaView>
  )
}

export default BookMark