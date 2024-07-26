import { AppButton } from "@/components/AppButton";
import { AppCheckBox } from "@/components/AppCheckBox";
import { AppTextInput } from "@/components/AppTextInput";
import { AppTitle } from "@/components/AppTitle";
import { filterAddresses } from "@/services/Address";
import { VStack, Box } from "native-base";
import { useState } from "react";

export default function Export(){

  const [name, setName] = useState("");
  const [locationType, setLocationType] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [project, setProject] = useState("");
  const [observations, setObservations] = useState("");
  const [plusCode, setPlusCode] = useState("");
  const [format, setFormat] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function search() {
    const result = await filterAddresses({project: "Projeto2024"});

    if(result) {
      setSearchResult(result)
      console.log(result)
    }
  }

  return (
    <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" p={5} bgColor="white">
      <AppTitle fontSize="xl" color="green.800">
        Exportar
      </AppTitle>

      <AppTextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
      />

      <AppTextInput
          placeholder="Tipo do local"
          value={locationType}
          onChangeText={setLocationType}
      />

      <AppTextInput
          placeholder="Data"
          value={createdAt}
          onChangeText={setCreatedAt}
      />

      <AppTextInput
          placeholder="Responsável pelo cadastro"
          value={createdBy}
          onChangeText={setCreatedBy}
      />

      <AppTextInput
          placeholder="Projeto"
          value={project}
          onChangeText={setProject}
      />

      <AppTextInput
          placeholder="Observações"
          value={observations}
          onChangeText={setObservations}
      />

      <AppTextInput
          placeholder="Observações"
          value={observations}
          onChangeText={setObservations}
      />

      <VStack flexDir="row">
        <AppCheckBox
          value={format}
          mt={3}
        >
          CSV
        </AppCheckBox>

        <AppCheckBox
          value={format}
          mt={3}
          ml={5}
        >
          Oi
        </AppCheckBox>

        <AppCheckBox
          value={format}
          mt={3}
          ml={5}
        >
          Oi
        </AppCheckBox>

        <Box flexGrow={1} />

        <AppButton mt={3} w="20%" onPress={search}>
          Filtrar
        </AppButton>
      </VStack>

      <Box flexGrow={1} />

      <AppButton mb={5}>
        Download
      </AppButton>
    </VStack>
  );
}