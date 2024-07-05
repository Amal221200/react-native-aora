import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ children, handlePress, isLoading, styles }) => {

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${isLoading ? 'opacity-50' : ''} ${styles}`} disabled={isLoading}>
      <Text className="font-psemibold text-lg text-primary">
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton