import React from 'react'
import { Container, Heading, VStack } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import DefaultLayout from '../components/layouts/Default'

const Savings = () => (
    <DefaultLayout>
        <Container pt={6}>
            <VStack spacing={4}>
                <Heading as="h1">Interest Rate Calculator</Heading>
                <Input label="Initial Savings amount" name="Initial Savings" />
                <Input label="Monthly Deposit" name="Monthly Deposit" />
                <Slider
                    label="Interest Rate"
                    name="Interest Rate"
                    defaultValue={2}
                    min={0}
                    max={15}
                />
            </VStack>
        </Container>
    </DefaultLayout>
)

export default Savings
