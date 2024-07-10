import { useLocalSearchParams } from 'expo-router'
import { StyledText, StyledSafeAreaView, StyledView } from '@/components/styledComponents';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { FlatList } from 'react-native';
import { Models } from 'react-native-appwrite';
import VideoCard from '@/components/VideoCard';
import useFetchSearchPosts from '@/hooks/posts/useFetchSearchPosts';

const Search = () => {
  const { query } = useLocalSearchParams();

  const { posts, isLoading } = useFetchSearchPosts(query as string)

  return (
    <StyledSafeAreaView className='h-full bg-primary'>
      <FlatList data={posts} keyExtractor={(item: Models.Document) => item.$id} renderItem={({ item: video }) => <VideoCard video={video} />} ListHeaderComponent={() => (
        <StyledView className="my-6 px-4">
          <StyledText className="font-pmedium text-sm text-gray-100">Search Results</StyledText>
          <StyledText className="font-psemibold text-2xl text-white">
            {query}
          </StyledText>
          <StyledView className='mb-8 mt-6'>
            <SearchInput initialQuery={query! as string} />
          </StyledView>
        </StyledView>
      )} ListEmptyComponent={() => (
        isLoading ? (
          <StyledView className='h-full items-center justify-center'>
            <StyledText className='font-psemibold text-2xl text-white'>Loading...</StyledText>
          </StyledView>
        ) :
          <EmptyState title="No Videos Found" subtitle="No video found for this search results" />
      )}
      />
    </StyledSafeAreaView>
  )
}

export default Search