var sqlite3 = require("cross-sqlcipher")

function Database(name) {
    var i,db = new sqlite3.Database(name)
    var get = db.get
    var all = db.all
    var exec = db.exec
    var run = db.run
    var prepare = db.prepare
    var close = db.close
    for (i in db) {
	(function(f,i,who) {
	    who[i] = function() {
		f.apply(db,arguments)
	    }
	})(db[i],i,this)
    }
    this.close = function() {
	return new Promise(function(resolve, reject) {
	    close.apply(db,[function() {
		resolve()
	    }])
	})
    }
    this.prepare = function(sql,params) {
	if (!params) params=[]
	return new Promise(function(resolve, reject) {
	    var stmt = prepare.apply(db,[sql,params,function(err) {
		if (err) {
		    reject(err)
		} else {
		    var stmt_run = stmt.run
		    stmt.run = function (params) {
			if (!params) params=[]
			return new Promise(function(resolve, reject) {
			    stmt_run.apply(stmt,[params,function(err) {
				if (err) {
				    reject(err)
				} else {
				    resolve(stmt)
				}
			    }])
			})    
		    }
		    resolve(stmt)
		}
	    }])
	})
    }
    this.get = function(sql,params) {
	if (!params) params=[]
	return new Promise(function(resolve, reject) {
	    get.apply(db,[sql,params,function(err,row) {
		if (err) {
		    reject(err)
		} else {
		    resolve(row)
		}
	    }])
	})
    }

    this.all = function(sql,params) {
	if (!params) params=[]
	return new Promise(function(resolve, reject) {
	    all.apply(db,[sql,params,function(err,row) {
		if (err) {
		    reject(err)
		} else {
		    resolve(row)
		}
	    }])
	})
    }
    this.exec = function (sql) {
	return new Promise(function(resolve, reject) {
	    exec.apply(db,[sql,function(err) {
		if (err) {
		    reject(err)
		} else {
		    resolve()
		}
	    }])
	})
    }
    this.run = function (sql,params) {
	// db.run(sql,param,callback)
	if (!params) params=[]
	return new Promise(function(resolve, reject) {
	    run.apply(db,[sql,params,function(err) {
		if (err) {
		    reject(err)
		} else {
		    resolve([this.changes,this.lastID])
		}
	    }])
	})    
    }
}

module.exports = {
    Database:Database
}

