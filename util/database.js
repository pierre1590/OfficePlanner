import * as SQLite from 'expo-sqlite';
import {Event} from '../models/event';

const database = SQLite.openDatabase('events.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
      database.transaction(tx => {
          tx.executeSql(
              `CREATE TABLE IF NOT EXISTS events (
                  id INTEGER PRIMARY KEY  NOT NULL,
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
          `INSERT INTO events (title, description,date, hour) VALUES (?, ?, ?, ?)`,
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

  // function to retrieve events for date
  export function getEventsForDate(date) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM events WHERE date = ?`,
          [date],
          (_, result) => {
            const dbEvent = result.rows._array.map(row => {
              return new Event(row.id, row.title, row.description, row.date, row.hour);
            });
            resolve(dbEvent);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
    return promise;
  }