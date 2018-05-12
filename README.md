Promise wrapper around cross-sqlcipher
======================================

Wraps cross-sqlcipher with promises.

# Install

npm install cross-sqlcipher-promise

# Usage Example

```js
var sqlite3 = require("cross-sqlcipher-promise")
var db = new sqlite3.Database("test.db")

db.serialize()
db.run("PRAGMA KEY = 'secret'").then( ()=> {
    return db.get("SELECT author FROM books WHERE rowid<10")
}).then(row => {
    console.log(row.name)
})

db.prepare("INSERT INTO books VALUES(author,title)",["Me","How to Code"])
  .then(stmt=>stmt.run())
  .then(stmt=>{
    var rowid_Integer = stmt.lastID
    stmt.finalize()
    return rowid_Integer
  })

db.close();
```

