import { getAddresses } from "@/services/Address";
import * as SQLite from "expo-sqlite/legacy";

interface Address {
    _id: string,
    name?: string,
    locationType: string,
    createdAt: string,
    createdBy: {name: string, _id: string},
    project: string,
    observations?: string,
    plusCode: string,
    location: {coordinates: ["longitude", "latitude"]}
  }

export async function setupOfflineDatabase() {
    const db = SQLite.openDatabase('addresses.db');
  
    // Deletar o banco se existir
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS addresses', [], () => {
        console.log('Tabela "addresses" deletada');
      });
      tx.executeSql('DROP TABLE IF EXISTS addresses_to_add', [], () => {
        console.log('Tabela "addresses_to_add" deletada');
      });
    });
  
    // Criar novas tabelas
    db.transaction(tx => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS addresses (
          _id TEXT PRIMARY KEY NOT NULL,
          name TEXT,
          locationType TEXT,
          createdBy TEXT,
          createdByName TEXT,
          project TEXT,
          observations TEXT,
          plusCode TEXT,
          latitude REAL,
          longitude REAL,
          createdAt TEXT
        )
      `);
  
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS addresses_to_add (
          _id TEXT PRIMARY KEY NOT NULL,
          name TEXT,
          locationType TEXT,
          createdBy TEXT,
          createdByName TEXT,
          project TEXT,
          observations TEXT,
          plusCode TEXT,
          latitude REAL,
          longitude REAL,
          createdAt TEXT
        )
      `);
    });

    // Puxa os dados da API
    getAddresses().then(addresses => {
      db.transaction(tx => {
        addresses.forEach((address : Address) => {
          const { _id, name, locationType, createdBy, project, observations, plusCode, createdAt } = address;
          const latitude = address.location.coordinates[1];
          const longitude = address.location.coordinates[0];
          const createdByName = address.createdBy.name;
  
          tx.executeSql(
            `INSERT INTO addresses (_id, name, locationType, createdBy, createdByName, project, observations, plusCode, latitude, longitude, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [_id, name ? name : null, locationType, createdBy._id, createdByName, project, observations ? observations : null, plusCode, latitude, longitude, createdAt]
          );
        });
      });
    });
}