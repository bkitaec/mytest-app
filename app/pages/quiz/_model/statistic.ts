import {Injectable} from '@angular/core';

let PouchDB = require('pouchdb');

@Injectable()
export class StatisticModel {
    private _db;
    private _statistic;

    initDB() {
        this._db = new PouchDB('quiz.statistic', { adapter: 'websql' });
    }

    getAll() {
        if (!this._statistic) {
            return this._db.allDocs({ include_docs: true})
                .then(docs => {

                    // Each row has a .doc object and we just want to send an
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this._statistic = docs.rows.map(row => {
                        // Dates are not automatically converted from a string.
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);

                    return this._statistic;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._statistic);
        }
    }

    add(statistic) {
        return this._db.post(statistic);
    }

    update(birthday) {
        return this._db.put(birthday);
    }

    delete(birthday) {
        return this._db.remove(birthday);
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._statistic, change.id);
        var birthday = this._statistic[index];

        if (change.deleted) {
            if (birthday) {
                this._statistic.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._statistic[index] = change.doc; // update
            } else {
                this._statistic.splice(index, 0, change.doc) // insert
            }
        }
    }

    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }


}