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

export async function getAddresses() {
    try {
        const result = await api.get("/addresses", await getTokenHeader());
        return result.data;
    }
    catch(error){
        console.log(error);
        return null;
    }
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
        return result.data;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

export async function getOneAddress(addressId: string) {
    if(!addressId) return null;

    try {
        const result = await api.get(`/addresses/${addressId}`, await getTokenHeader());
        return result.data;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}

export async function deleteOneAddress(addressId: string) {
    if(!addressId) return null;

    try {
        const result = await api.delete(`/addresses/${addressId}`, await getTokenHeader());
        return result.data;
    }
    catch(error) {
        console.log(error);
        return null;
    }
}