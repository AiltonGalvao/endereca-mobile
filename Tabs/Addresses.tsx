import { AddressCard } from "@/components/AddressCard";
import { AppButton } from "@/components/AppButton";
import { AppTextInput } from "@/components/AppTextInput";
import { AppTitle } from "@/components/AppTitle";
import { searchAddresses } from "@/services/Address";
import { formatDateString } from "@/utils/conversions";
import { VStack, ScrollView } from "native-base";
import { useState } from "react";

export interface Address {
  name?: string,
  locationType: string,
  createdAt: string,
  createdBy: {name: string},
  project: string,
  observations?: string,
  plusCode: string,
  location: string
}

export default function Addresses(){

  const [searchState, setSearchState] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function search() {
    const result = await searchAddresses(searchState)

    if(result) {
      setSearchResult(result)
      console.log(result)
    }
  }

  return (
    <ScrollView flex={1} bgColor="white" p={5}>
      <VStack flex={1} alignItems="flex-start" justifyContent="flex-start">
        <AppTitle fontSize="xl" color="green.800" alignSelf="flex-start">
            Endereços
        </AppTitle>

        <AppTextInput
            placeholder="Pesquisar Endereço"
            value={searchState}
            onChangeText={setSearchState}
        />

        <AppButton mt={3} onPress={search}>
          Pesquisar
        </AppButton>
      </VStack>

      {searchResult?.map((address: Address, index) => (
        <VStack mb={0.5} w="100%" bgColor="white" key={index}>
          <AddressCard
            name={address.name}
            locationType={address.locationType}
            createdAt={formatDateString(address.createdAt)}
            createdBy={address.createdBy.name}
            project={address.project}
            observations={address.observations}
            plusCode={address.plusCode}
            location={address.location}
          />
      </VStack>
      ))}
    </ScrollView>
  );
}