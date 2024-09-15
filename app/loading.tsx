import { Center, Container, Loader, LoadingOverlay } from "@mantine/core";

export default function LoadingPage(){
    return(
    <Container>
        <Center mt={'46%'}>
            <Loader color='teal' size={40}/>
        </Center>
    </Container>)
}