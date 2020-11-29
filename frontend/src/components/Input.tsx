import React from 'react'
import { Input as ChakraInput, InputProps, Text, Box } from '@chakra-ui/react'

type Props = InputProps & {
    label?: string
}

const Input = ({ label, ...rest }: Props) => (
    <Box width="100%">
        {!!label && <Text align="left">{label}</Text>}
        <ChakraInput {...rest} />
    </Box>
)

export default Input
