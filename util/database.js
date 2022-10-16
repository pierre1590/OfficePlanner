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
  // if hours < 10 add 0 before and moniutes < 10 add 0 before 
  const hours = event.hour.getHours() < 10 ? '0' + event.hour.getHours() : event.hour.getHours();
  const minutes = event.hour.getMinutes() < 10 ? '0' + event.hour.getMinutes() : event.hour.getMinutes();
  const hour = hours + ':' + minutes;
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO events (id,title, description,date, hour) VALUES (?, ?, ?, ?,?)`,
          [
            event.id,
            event.title,
            event.description,
            // Set up date 
            event.date.toISOString().split('T')[0],
            // Set up hour with new Date().setHours() and new Date().setMinutes()
            hour
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



// function to clear all events per date
export function clearEvents(date) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE  FROM events WHERE date = ?`,
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


// function to retrieve all events for a specific date and order them by hour
export function getEventsForDate(date) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        // order by date and order by hour from 00:01AM to 23:59PM

        `SELECT * FROM events WHERE date = ? ORDER BY hour ASC`,
        [date],
        (_, result) => {
          const dbEvent = result.rows._array.map((row) => {
            return new Event(
              row.title,
              row.description,
              row.date,
              row.hour,
              row.id
            );
          });
          console.log(dbEvent);
          resolve(dbEvent);
        }
      );
    });
  });
  return promise;
}


// function to delete event per id
export function deleteEvent(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM events WHERE id = ?`,
        [id],
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



