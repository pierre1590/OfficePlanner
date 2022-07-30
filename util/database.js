import * as SQLite from 'expo-sqlite';
import {Event} from '../models/event';

const database = SQLite.openDatabase('events.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
      database.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS events (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
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
            event.description,
            //Set up date in format YYYY-MM-DD 
            event.date.toISOString().slice(0,10),
            //Set up hour in format HH:MM
            event.hour.toISOString().slice(11,16),
          ],
          (_, result) => {
           console.log(result);
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

  // function to retrieve all events
  export function getEvents() {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM events`,
          [],
          (_, result) => {
            const dbEvent = result.rows._array.map((row) => {
              return new Event(row.title, row.description, row.date, row.hour);
            });
            console.log(dbEvent);
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


// function to clear all events per date
export function clearEvents(date) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM events WHERE date = ?`,
        [date],
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
  

//function to delete single event by id
export function deleteEvent(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE  FROM events WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        }
      );
    });
  });
  return promise;
}