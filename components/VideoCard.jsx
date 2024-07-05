import { View, Text, Image, TouchableOpacity } from 'react-native'
import { icons } from "../constants"
import { useState } from 'react'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ video }) => {
    const [play, setPlay] = useState(false)

    return (
        <View className="mb-14 items-center px-4">
            <View className="flex-row items-start gap-3">
                <View className="flex-1 flex-row items-center justify-center">
                    <View className="h-[46px] w-[46px] items-center justify-center rounded-lg border border-secondary p-0.5">
                        <Image source={{ uri: video.creator.avatar }}
                            className="h-full w-full rounded-lg"
                            resizeMode='cover' />
                    </View>
                    <View className="ml-3 flex-1 justify-center gap-y-1">
                        <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
                            {video.title}
                        </Text>
                        <Text className="font-pregular text-xs text-gray-100" numberOfLines={1}>
                            {video.creator.username}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} resizeMode='contain' className="h-5 w-5" />
                </View>
            </View>
            {
                play ? (
                    <Video source={require('../assets/video.mp4')} resizeMode={ResizeMode.CONTAIN} className="mt-3 h-60 w-full rounded-xl" useNativeControls shouldPlay onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinished) {
                            setPlay(false)
                        }
                    }} />
                ) : (
                    <TouchableOpacity onPress={() => setPlay(true)} activeOpacity={0.7} className="relative mt-3 h-60 w-full items-center justify-center rounded-xl">
                        <Image source={{ uri: video.thumbnail }} resizeMode='cover' className="mt-3 h-full w-full rounded-xl" />
                        <TouchableOpacity onPress={() => setPlay(true)} className="absolute">
                            <Image source={icons.play} resizeMode='contain' className="mt-3 h-12 w-12 rounded-xl" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default VideoCard