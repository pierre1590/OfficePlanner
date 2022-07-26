import * as SQLite from 'expo-sqlite';
import {Event} from '../models/event';

const database = SQLite.openDatabase('events.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY NOT NULL ,
                    title TEXT NOT NULL,
                    description TEXT NOT NULL, 
                    date TEXT NOT NULL,
                    hour TEXT NOT NULL
                    )`,
                [],
                () => {
                    resolve();
                  },
                  (_, error) => {
                    reject(error);
                  }
                );
              });
        });
            return promise;
}


export function insertEvent(event) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO event (title, description,date, hour) VALUES (?, ?, ?, ?)`,
          [
            event.title,
            event.desciption,
            event.date,
            event.hour,
          ],
          (_, result) => {
           
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }