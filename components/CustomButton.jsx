import { TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ children, handlePress, className, isLoading, style }) => {

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${isLoading ? 'opacity-50' : ''}`} style={style} disabled={isLoading}>
      {children}
    </TouchableOpacity>
  )
}

export default CustomButton