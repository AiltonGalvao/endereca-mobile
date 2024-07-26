import { AppButton } from "@/components/AppButton";
import { AppTextInput } from "@/components/AppTextInput";
import { AppTitle } from "@/components/AppTitle";
import { VStack, ScrollView, Box, Text, useToast } from "native-base";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"; // Isso aqui fica dando erro na IDE mas funciona
import { encode } from "pluscodes";
import { registerAddress } from "@/services/Address";
import { User } from "@/interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "@/services/User";
import Geolocation from '@react-native-community/geolocation';

export default function Register(){
  const [plusCode, setPlusCode] = useState("00000000+0000");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [locationType, setLocationType] = useState("");
  const [project, setProject] = useState("");
  const [observations, setObservations] = useState("");

  const [userData, setUserData] = useState({} as User);
  const toast = useToast();

  useEffect(() => {
    async function userData() {
      const userId = await AsyncStorage.getItem("userId");

      if(!userId) return null;

      const result = await getUserData(userId);
      if(result) {
        setUserData(result);
        console.log(result);
      }
    }
    userData();
  }, []);

  async function getUserLocation() {
    Geolocation.getCurrentPosition(info => console.log(info));
  }

  async function register(){
    const result = await registerAddress({
      ...(name && { name }), // Adiciona a propriedade name apenas se ela não estiver vazia
      locationType: locationType,
      createdBy: userData.email,
      project: project,
      ...(observations && {observations}), // Mesma coisa de cima
      plusCode: plusCode,
      location: {
        "type": "Point",
        "coordinates": [longitude, latitude]
      }
    })

    if (result) {
      toast.show({
        title: 'Endereço cadastrado',
        description: `Pluscode: ${plusCode}`,
        backgroundColor: 'green.500',
      });
    }
    else {
      toast.show({
        title: 'Erro ao cadastrar endereço',
        description: 'Verifique os dados e tente novamente',
        backgroundColor: 'red.500',
      })
    }
  }

  function calculatePlusCode(latitude: string, longitude: string) {
    const plusCode = encode({ latitude: latitude, longitude: longitude }, 10) || "00000000+0000";
    setPlusCode(plusCode);
  }

  useEffect(() => {
    calculatePlusCode(latitude, longitude);
  });

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
            value={name}
            onChangeText={setName}
          />
          <AppTextInput
            label="Tipo do Local"
            placeholder="Insira o tipo do local"
            value={locationType}
            onChangeText={setLocationType}
          />
          <AppTextInput
            label="Projeto"
            placeholder="Insira o nome do projeto"
            value={project}
            onChangeText={setProject}
          />
          <AppTextInput
            label="Observações"
            placeholder="Adicione observações (opcional)"
            value={observations}
            onChangeText={setObservations}
          />
          <Text fontSize="sm" fontWeight="bold" color={"gray.500"} mt={3} mb={1}>Localização</Text>
          <VStack flexDir="row">
            <Box w="45%">
              <AppTextInput
                placeholder="Lat"
                mt={0}
                width="90%"
                value={latitude}
                onChangeText={setLatitude}
              />
            </Box>
            <Box w="45%">
              <AppTextInput
                placeholder="Lon"
                mt={0}
                width="90%"
                value={longitude}
                onChangeText={setLongitude}
              />
            </Box>
            <Box w="10%" alignSelf="center">
              <AppButton mt={0} onPress={getUserLocation}>
                <Ionicons name="location-outline" color="#fff"/>
              </AppButton>
            </Box>
          </VStack>

          <Text fontSize="sm" fontWeight="bold" color={"gray.500"} mt={3} mb={1}>Pluscode</Text>

          <Text color="green.800" fontWeight="bold" fontSize="md">{plusCode}</Text>
      </Box>
      <AppButton>Cadastrar Local</AppButton>
      </VStack>
    </ScrollView>
  );
}