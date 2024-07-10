import { useCallback, useState } from 'react'
import { ResizeMode } from "expo-av"
import { icons } from '../constants'
import { StyledImage, StyledImageBackground, StyledTouchableOpacity, StyledVideo, StyledView, StyledAnimatable } from './styledComponents'
import { FlatList, RefreshControl, ViewToken } from 'react-native'
import { Post } from '@/lib/types'
import useFetchLatestPosts from '@/hooks/posts/useFetchLatestPosts'

const zoomIn = { from: { transform: [{ scale: 0.9 }] }, to: { transform: [{ scale: 1 }] } }
const zoomOut = { from: { transform: [{ scale: 1 }] }, to: { transform: [{ scale: 0.9 }] } }

const TrendingItem = ({ activeItem, item }: { activeItem: string, item: Post }) => {
    const [play, setPlay] = useState(false);

    return (
        <StyledAnimatable className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
            {
                play ? (
                    <StyledVideo source={{ uri: item.video }} resizeMode={ResizeMode.CONTAIN} className="h-72 w-52 rounded-[35px] bg-white/10" useNativeControls shouldPlay onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded && status.didJustFinish) {
                            setPlay(false)
                        }
                    }} />
                ) : (
                    <StyledTouchableOpacity className="relative items-center justify-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
                        <StyledImageBackground source={{ uri: item.thumbnail }} className="my-5 h-72 w-52 overflow-hidden rounded-[35px] shadow-lg shadow-black-200" resizeMode='cover' />
                        <StyledImage source={icons.play} className="absolute h-12 w-12" resizeMode='contain' />
                    </StyledTouchableOpacity>
                )
            }
        </StyledAnimatable>
    )
}

const Trending = () => {
    const { posts, refetch } = useFetchLatestPosts()
    const [activeItem, setActiveItem] = useState(posts?.[1]?.$id!);
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }, [refetch])

    const viewableItemsChange = useCallback(({ viewableItems }: {
        viewableItems: ViewToken<Post>[];
        changed: ViewToken<Post>[];
    }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }, [])

    return (
        <StyledView>
            <FlatList data={posts ?? []} keyExtractor={(item) => item.$id} renderItem={({ item }) => (
                <TrendingItem item={item} activeItem={activeItem} />
            )} horizontal onViewableItemsChanged={viewableItemsChange}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 70,
                }}
                contentOffset={{ x: 170, y: 10 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                maxToRenderPerBatch={5}
            />
        </StyledView>
    )
}

export default Trending