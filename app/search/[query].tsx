import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { StyledText, StyledSafeAreaView, StyledView } from '@/components/styledComponents';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { FlatList, ToastAndroid } from 'react-native';
import { Models } from 'react-native-appwrite';
import VideoCard from '@/components/VideoCard';
import useFetchSearchPosts from '@/hooks/posts/useFetchSearchPosts';
import { useCallback } from 'react';

const Search = () => {
  const { query } = useLocalSearchParams();
  const pathname = usePathname()
  
  const { posts, isLoading } = useFetchSearchPosts(query as string)
  
  const handleSearch = useCallback((query: string) => {
    if (!query) {
      return ToastAndroid.showWithGravity('Please input something to search results across database', 3, ToastAndroid.TOP)
    }
    if (pathname.startsWith('/search/')) {
      router.setParams({ query })
    } else {
      router.push(`/search/${query}`)
    }
  }, [pathname])
  return (
    <StyledSafeAreaView className='h-full bg-primary'>
      <FlatList data={posts} keyExtractor={(item: Models.Document) => item.$id} renderItem={({ item: video }) => <VideoCard video={video} />} ListHeaderComponent={() => (
        <StyledView className="my-6 px-4">
          <StyledText className="font-pmedium text-sm text-gray-100">Search Results</StyledText>
          <StyledText className="font-psemibold text-2xl text-white">
            {query}
          </StyledText>
          <StyledView className='mb-8 mt-6'>
            <SearchInput initialQuery={query! as string} onSearch={handleSearch} />
          </StyledView>
        </StyledView>
      )} ListEmptyComponent={() => (
        isLoading ? (
          <StyledView className='h-full items-center justify-center'>
            <StyledText className='font-psemibold text-2xl text-white'>Loading...</StyledText>
          </StyledView>
        ) :
          <EmptyState action={() => { router.push('/create') }} title="No Videos Found" subtitle="No video found for this search results" text='Create a video' />
      )}
      />
    </StyledSafeAreaView>
  )
}

export default Search