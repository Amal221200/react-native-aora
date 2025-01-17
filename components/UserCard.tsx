import React, { useCallback } from 'react'
import { StyledImage, StyledTouchableOpacity, StyledView } from './styledComponents'
import { icons } from '@/constants'
import InfoCard from './InfoCard'
import { signOut } from '@/lib/users'
import { router } from 'expo-router'
import useSession from '@/hooks/useSession'
import { useQueryClient } from '@tanstack/react-query'

const UserCard = ({ posts }: { posts: number }) => {
    const { isLoading, user } = useSession()
    const queryClient = useQueryClient()
    const handleLogout = useCallback(async () => {
        await signOut()
        await queryClient.invalidateQueries({ queryKey: ['session'] })
        router.replace('/sign-in')
    }, [queryClient])

    if (isLoading) {
        return null
    }

    return (
        <StyledView className="mb-12 mt-6 w-full items-center justify-center space-y-6 px-4">
            <StyledView className='w-full items-end'>
                <StyledTouchableOpacity onPress={handleLogout} className=''>
                    <StyledImage source={icons.logout} resizeMode='contain' className='h-6 w-6' />
                </StyledTouchableOpacity>
            </StyledView>
            <StyledView className='h-16 w-16 items-center justify-center rounded-lg border border-secondary'>
                <StyledImage source={{ uri: user?.avatar }} resizeMode='cover' className='h-[90%] w-[90%] rounded-lg' />
            </StyledView>

            <InfoCard title={user?.username!} containerStyles='mt-5' titleStyles='text-lg' />

            <StyledView className='mt-5 flex-row items-center'>
                <InfoCard title={posts.toString()} containerStyles='mr-7' subtitle='Posts' titleStyles='text-lg' />
                <InfoCard title={'1.2k'} subtitle='Followers' titleStyles='text-lg' />
            </StyledView>
        </StyledView>
    )
}

export default UserCard