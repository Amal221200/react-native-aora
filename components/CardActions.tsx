import { ReactNode, useCallback, useMemo, useState } from 'react'
import { StyledText, StyledTouchableOpacity, StyledView } from './styledComponents'
import { MaterialIcons } from '@expo/vector-icons';
import { Post } from '@/lib/types';
import { deletePost } from '@/lib/posts';
import useSession from '@/hooks/useSession';
import { useQueryClient } from '@tanstack/react-query';

const CardActions = ({ children, post }: { children: ReactNode, post: Post }) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSession()
    
    const toggleOpen = useCallback(() => {
        setOpen(current => !current)
    }, []);

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
                <StyledTouchableOpacity activeOpacity={0.7} disabled={loading} className={`flex-row items-center gap-x-1 ${loading ? 'opacity-50' : ''}`}>
                    <MaterialIcons name="bookmark" size={15} color="#FF9C01" />
                    <StyledText className='text-white'>
                        Save
                    </StyledText>
                </StyledTouchableOpacity>
                {
                    isUser && (
                        <StyledTouchableOpacity activeOpacity={0.7} disabled={loading} onPress={onDelete} className={`flex-row items-center gap-x-1 ${loading ? 'opacity-50' : ''}`}>
                            <MaterialIcons name="delete" size={15} color="red" />
                            <StyledText className='text-white'>
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