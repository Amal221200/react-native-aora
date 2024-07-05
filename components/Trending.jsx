import { useCallback, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from "react-native-animatable"
import { Video, ResizeMode } from "expo-av"
import { icons } from '../constants'

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}
const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
            {
                play ? (
                    <Video source={require('../assets/video2.mp4')} resizeMode={ResizeMode.CONTAIN} className="h-72 w-52 rounded-[35px] bg-white/10" useNativeControls shouldPlay onPlaybackStatusUpdate={(status)=> {
                        if(status.didJustFinished){
                            setPlay(false)
                        }
                    }} />
                ) : (
                    <TouchableOpacity className="relative items-center justify-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
                        <ImageBackground source={{ uri: item.thumbnail }} className="my-5 h-72 w-52 overflow-hidden rounded-[35px] shadow-lg shadow-black-200" resizeMode='cover' />
                        <Image source={icons.play} className="absolute h-12 w-12" resizeMode='contain' />
                    </TouchableOpacity>
                )
            }
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts?.[1]?.$id);

    const viewableItemsChange = useCallback(({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }, [])
    return (
        <View>
            <FlatList data={posts} keyExtractor={(item) => item.$id} renderItem={({ item }) => (
                <TrendingItem item={item} activeItem={activeItem} />
            )} horizontal onViewableItemsChanged={viewableItemsChange}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 70,
                }}
                contentOffset={{ x: 170 }}
            />
        </View>
    )
}

export default Trending