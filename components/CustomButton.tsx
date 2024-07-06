import { StyledText, StyledTouchableOpacity } from "./styledComponents"
import { ReactNode } from 'react'

interface CustomButtonProps {
  children: ReactNode,
  handlePress?: () => void,
  isLoading?: boolean,
  styles?: string
}

const CustomButton = ({ children, handlePress, isLoading, styles }: CustomButtonProps) => {

  return (
    <StyledTouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${isLoading ? 'opacity-50' : ''} ${styles}`} disabled={isLoading}>
      <StyledText className="font-psemibold text-lg text-primary">
        {children}
      </StyledText>
    </StyledTouchableOpacity>
  )
}

export default CustomButton