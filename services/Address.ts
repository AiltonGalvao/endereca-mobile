import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { Address } from "@/interfaces/Address";

async function getTokenHeader() {
    const token = await AsyncStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return config;
}

export async function searchAddresses(searchString: string) {
    try {
        const result = await api.get(`/addresses/search?searchString=${searchString}`, await getTokenHeader());
        return result.data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export async function filterAddresses(searchParams: object) {
    let searchString = "/addresses/filtered_search?";
    
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
        params.append(key, value);
    }

    searchString += params.toString();

    console.log(searchString);

    try {
        const result = await api.get(searchString, await getTokenHeader());
        return result.data;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

export async function registerAddress(address: Address) {
    if(!address) return null;

    try {
        const result = await api.post("/addresses", address, await getTokenHeader());
        console.log(result.data);
        return result.data;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}