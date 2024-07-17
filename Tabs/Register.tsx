import { AppButton } from "@/components/AppButton";
import { AppSmallTextInput } from "@/components/AppSmallTextInput";
import { AppTextInput } from "@/components/AppTextInput";
import { AppTitle } from "@/components/AppTitle";
import { VStack, ScrollView, Box, Text, View } from "native-base";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";



export default function Register(){
  const [plusCode] = useState(0)

  return (
    <ScrollView flex={1} bgColor="white">
      <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" p={5}>
        <AppTitle fontSize="xl" color="green.800" alignSelf="flex-start">
            Cadastrar
        </AppTitle>

        <Box>
          <AppTextInput
            label="Nome"
            placeholder="Insira o nome do local (opcional)"
          />
          <AppTextInput
            label="Tipo do Local"
            placeholder="Insira o tipo do local"
          />
          <AppTextInput
            label="Projeto"
            placeholder="Insira o nome do projeto"
          />
          <AppTextInput
            label="Observações"
            placeholder="Adicione observações (opcional)"
          />
          <Text fontSize="sm" fontWeight="bold" color={"gray.500"} mt={3} mb={1}>Localização</Text>
          <VStack flexDir="row">
            <Box w="45%">
              <AppSmallTextInput
                placeholder="Lat"
              />
            </Box>
            <Box w="45%">
              <AppSmallTextInput
                placeholder="Lon"
              />
            </Box>
            <Box w="10%" alignSelf="center">
              <AppButton mt={0}>
                <Ionicons name="location-outline" color="#fff"/>
              </AppButton>
            </Box>
          </VStack>

          <Text fontSize="sm" fontWeight="bold" color={"gray.500"} mt={3} mb={1}>Pluscode</Text>

          <Text>{plusCode}</Text>
      </Box>
      <AppButton>Cadastrar Local</AppButton>
      </VStack>
    </ScrollView>
  );
}