import { icons } from "../constants"
import { useState } from 'react'
import { ResizeMode } from 'expo-av'
import { StyledImage, StyledText, StyledTouchableOpacity, StyledVideo, StyledView } from './styledComponents'
import { Post } from "@/lib/types"

const VideoCard = ({ video }: { video: Post }) => {
    const [play, setPlay] = useState(false)

    return (
        <StyledView className="mb-14 items-center px-4">
            <StyledView className="flex-row items-start gap-3">
                <StyledView className="flex-1 flex-row items-center justify-center">
                    <StyledView className="h-[46px] w-[46px] items-center justify-center rounded-lg border border-secondary p-0.5">
                        <StyledImage source={{ uri: video.creator.avatar }}
                            className="h-full w-full rounded-lg"
                            resizeMode='cover' />
                    </StyledView>
                    <StyledView className="ml-3 flex-1 justify-center gap-y-1">
                        <StyledText className="font-psemibold text-sm text-white" numberOfLines={1}>
                            {video.title}
                        </StyledText>
                        <StyledText className="font-pregular text-xs text-gray-100" numberOfLines={1}>
                            {video.creator.username}
                        </StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="pt-2">
                    <StyledImage source={icons.menu} resizeMode='contain' className="h-5 w-5" />
                </StyledView>
            </StyledView>
            {
                play ? (
                    <StyledVideo source={{ uri: video.video }} resizeMode={ResizeMode.CONTAIN} className="mt-3 h-60 w-full rounded-xl" useNativeControls shouldPlay onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded && status.didJustFinish) {
                            setPlay(false)
                        }
                    }} />
                ) : (
                    <StyledTouchableOpacity onPress={() => setPlay(true)} activeOpacity={0.7} className="relative mt-3 h-60 w-full items-center justify-center rounded-xl">
                        <StyledImage source={{ uri: video.thumbnail }} resizeMode='cover' className="mt-3 h-full w-full rounded-xl" />
                        <StyledTouchableOpacity onPress={() => setPlay(true)} className="absolute">
                            <StyledImage source={icons.play} resizeMode='contain' className="mt-3 h-12 w-12 rounded-xl" />
                        </StyledTouchableOpacity>
                    </StyledTouchableOpacity>
                )
            }
        </StyledView>
    )
}

export default VideoCard