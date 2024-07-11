import { ReactNode, useCallback, useMemo, useState } from 'react'
import { StyledText, StyledTouchableOpacity, StyledView } from './styledComponents'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Post } from '@/lib/types';
import { deletePost } from '@/lib/posts';
import useSession from '@/hooks/useSession';
import { useQueryClient } from '@tanstack/react-query';
import useFetchBookmarked from '@/hooks/bookmark/useFetchBookmarked';
import { toggleBookmark } from '@/lib/bookmark';
import { ToastAndroid } from 'react-native';

const CardActions = ({ children, post }: { children: ReactNode, post: Post }) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSession()
    const { bookmarked } = useFetchBookmarked(post.$id)

    const toggleOpen = useCallback(() => {
        setOpen(current => !current)
    }, []);

    const onBookmark = useCallback(async () => {
        try {
            setLoading(true)
            await toggleBookmark(user?.$id!, post.$id, bookmarked!)
            await queryClient.invalidateQueries({ queryKey: ['bookmark', user?.$id ?? '', post.$id] })
            await queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.$id ?? ''] })
            ToastAndroid.showWithGravity(bookmarked ? 'Video is removed from Bookmarks' : 'Video is saved in bookmarks', 5, ToastAndroid.BOTTOM)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [bookmarked, user, post, queryClient])

    const onDelete = useCallback(async () => {
        setLoading(true)
        try {
            await deletePost(post.$id)
            await queryClient.invalidateQueries({ queryKey: ['all_posts'] })
            await queryClient.invalidateQueries({ queryKey: ['latest_posts'] })
            await queryClient.invalidateQueries({ queryKey: ['user_posts', user?.$id ?? ''] })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }, [post.$id, queryClient, user])

    const isUser = useMemo(() => user?.$id === post.creator.$id, [user?.$id, post.creator.$id])

    return (
        <StyledView className='relative w-max'>
            <StyledTouchableOpacity onPress={toggleOpen}>
                {children}
            </StyledTouchableOpacity>
            <StyledView className={`${open ? 'max-h-max -top-[70px] border p-1' : 'max-h-0 top-0 border-0 p-0'}  border-white/30 bg-black absolute w-[100px] duration-500 rounded-lg transition-all right-0 overflow-hidden z-[5] gap-y-1`}>
                <StyledTouchableOpacity activeOpacity={0.7} disabled={loading} onPress={onBookmark} className={`flex-row items-center gap-x-[6px] ${loading ? 'opacity-50' : ''}`}>
                    {
                        bookmarked ?
                            <>
                                <MaterialIcons name="bookmark" size={18} color="#FF9C01" />
                                <StyledText className='text-[15px] text-white'>
                                    Remove
                                </StyledText>
                            </>
                            :
                            <>
                                <Feather name="bookmark" size={18} color="#FF9C01" />
                                <StyledText className='text-[15px] text-white'>
                                    Save
                                </StyledText>
                            </>
                    }
                </StyledTouchableOpacity>
                {
                    isUser && (
                        <StyledTouchableOpacity activeOpacity={0.7} disabled={loading} onPress={onDelete} className={`flex-row items-center gap-x-[6px] ${loading ? 'opacity-50' : ''}`}>
                            <MaterialIcons name="delete" size={18} color="red" />
                            <StyledText className='text-[15px] text-white'>
                                Delete
                            </StyledText>
                        </StyledTouchableOpacity>
                    )
                }
            </StyledView>
        </StyledView>
    )
}

export default CardActions