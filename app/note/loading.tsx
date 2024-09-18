import { Center, Container, Loader, LoadingOverlay } from "@mantine/core";
import React from "react";

export default function LoadingPage(){
    return(
    <Container>
        <Center mt={'46%'}>
            <Loader color='teal' size={40}/>
        </Center>
    </Container>)
}