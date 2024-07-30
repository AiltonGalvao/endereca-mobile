export function formatDateString(date: string) {
    return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)} ${date.slice(11, 19)}`;
}

export function convertToCSV(object_list: []) {
    const csvString = [
        [
            "Nome",
            "Tipo de Localização",
            "Criado em",
            "Responsável",
            "Projeto",
            "Observações",
            "Pluscode",
            "Latitude",
            "Longitude"
        ],
        ...object_list.map(address => [
            address["name"],
            address["locationType"],
            address["createdAt"],
            address["createdBy"]["email"],
            address["project"],
            address["observations"],
            address["plusCode"],
            address["location"]["coordinates"][1],
            address["location"]["coordinates"][0]
          ])
        ]
         .map(e => e.join(",")) 
         .join("\n");

    console.log(csvString);
}