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
    return db.get("SELECT name FROM books WHERE rowid<10")
}).then(row => {
    console.log(row.name)
})

db.close();
```

