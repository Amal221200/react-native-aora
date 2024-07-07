import React, { useCallback, useContext, useState } from 'react'
import { StyledImage, StyledSafeAreaView, StyledScrollView, StyledText, StyledTouchableOpacity, StyledVideo, StyledView } from '@/components/styledComponents'
import FormField from '@/components/FormField'
import { ResizeMode } from 'expo-av';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';
import * as ImagePicker from 'expo-image-picker'
import { Alert, ToastAndroid } from 'react-native';
import { SessionContext, TSessionContext } from '@/components/providers/SessionProvider';
import { router } from 'expo-router';
import { createPost } from '@/lib/posts';

export interface formDataProps {
  title: string,
  video: ImagePicker.ImagePickerAsset | null,
  thumbnail: ImagePicker.ImagePickerAsset | null,
  prompt: string
}

const Create = () => {
  const { user } = useContext(SessionContext) as TSessionContext
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<formDataProps>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  });

  const openPicker = useCallback(async (selectType: 'video' | 'image') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos
    })

    if (result.canceled) {
      if (!formData[selectType === 'image' ? 'thumbnail' : 'video']) {
        setTimeout(() => {
          Alert.alert('Document Picked', JSON.stringify(result, null, 2))
        }, 100)
      }
      return
    }

    if (selectType === 'image') {
      setFormData(current => ({ ...current, thumbnail: result.assets[0] }))
    }
    if (selectType === 'video') {
      setFormData(current => ({ ...current, video: result.assets[0] }))
    }

  }, [formData])

  const handleSubmit = useCallback(async () => {
    const { prompt, thumbnail, title, video } = formData
    if (!prompt || !thumbnail || !video || !title) {
      ToastAndroid.showWithGravity('Please enter all the fiels', 5, ToastAndroid.BOTTOM)
      return
    }

    setIsUploading(true)
    try {
      await createPost({ ...formData, creator: user?.$id! });
      router.push('/home')
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false)
      setFormData({
        title: '',
        video: null,
        prompt: '',
        thumbnail: null
      })
    }
  }, [formData, user?.$id])

  return (
    <StyledSafeAreaView className='h-full bg-primary'>
      <StyledScrollView className='my-6 px-4'>
        <StyledText className='font-psemibold text-2xl text-white'>
          Upload Video
        </StyledText>

        <FormField title='Video Title' value={formData.title} onChangeText={(value) => setFormData(current => ({ ...current, title: value }))} placeholder='Give your video a catch title...' styles='mt-10' />

        <StyledView className='mt-7 space-y-2'>
          <StyledText className='font-pmedium text-base text-gray-100'>Upload Video</StyledText>
          <StyledTouchableOpacity onPress={() => openPicker('video')}>
            {
              formData.video ? (
                <StyledVideo source={{ uri: formData.video.uri }} className='h-64 w-full rounded-2xl' resizeMode={ResizeMode.CONTAIN} />
              ) :
                <StyledView className='h-40 w-full items-center justify-center rounded-2xl bg-black-100 px-4'>
                  <StyledView className='h-14 w-14 items-center justify-center border border-dashed border-secondary'>
                    <StyledImage source={icons.upload} resizeMode='contain' className='h-1/2 w-1/2' />
                  </StyledView>
                </StyledView>
            }
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className='mt-7 space-y-2'>
          <StyledText className='font-pmedium text-base text-gray-100'>Thumbnail Image</StyledText>
          <StyledTouchableOpacity onPress={() => openPicker('image')}>
            {
              formData.thumbnail ? (
                <StyledImage source={{ uri: formData.thumbnail.uri }} className='h-64 w-full rounded-2xl' resizeMode='cover' />
              ) :
                <StyledView className='flex h-16 w-full flex-row items-center justify-center space-x-2 rounded-2xl border-2 border-black-200 bg-black-100 px-4'>
                  <StyledImage source={icons.upload} resizeMode='contain' className='h-5 w-5' />
                  <StyledText className='font-pmedium text-sm text-gray-100'>
                    Choose a file
                  </StyledText>
                </StyledView>
            }
          </StyledTouchableOpacity>
        </StyledView>

        <FormField title='AI Prompt' value={formData.prompt} onChangeText={(value) => setFormData(current => ({ ...current, prompt: value }))} placeholder='The prompt you used to create this video' styles='mt-10' />

        <CustomButton handlePress={handleSubmit} isLoading={isUploading} styles='mt-7' >
          Submit & Publish
        </CustomButton>
      </StyledScrollView>
    </StyledSafeAreaView>
  )
}

export default Create