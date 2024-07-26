import { VStack, Text } from "native-base";
import { AppTitle } from "./AppTitle";

interface CardProps {
    name?: string,
    locationType: string,
    createdAt: string,
    createdBy: string,
    project: string,
    observations?: string,
    plusCode: string,
    location: string
}

export function AddressCard({
    name,
    locationType,
    createdAt,
    createdBy,
    project,
    observations,
    plusCode,
    location
}: CardProps) {
    return(
        <VStack w="99%" alignSelf="center" borderRadius="lg" p={5} shadow={3} mt={5} bgColor="white">
            <AppTitle fontSize="lg" alignSelf="flex-start" mt={0}>
                {plusCode} {"\n"}
            </AppTitle>
            <Text fontWeight="bold" color="gray.500">
                Tipo do Local: {locationType} {"\n"}
                Criado em: {createdAt} {"\n"}
                Criado por: {createdBy} {"\n"}
                Projeto: {project}
                {observations ? "\nObservações: " + observations : " "}
                {name ? "\nNome: " + name: " "}
            </Text>
        </VStack>
    );
};