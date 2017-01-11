var config = {
development: {
    //url to be used in link generation
    url: 'http://127.0.0.1:8888',
    //couchdb connection settings
    database: {
        url : 'http://95.85.47.74:32775',
        db: 'auditserverdb'
    },
    //server details
    server: {
        host: '127.0.0.1',
        port: '8888'
    },

    reportserver: {
        host: '127.0.0.1',
        port: '8889'
    },
    clientConfig:{
        Version:"1.0",
        Contact_Interval:1, 
        Contact_Delay :60
    }
},
production: {
    //url to be used in link generation
    url: 'http://127.0.0.1:8888',
    //mongodb connection settings
    database: {
        url : 'mongodb://localhost:27017/auditserverdb'
        //host:   '127.0.0.1',
        //port:   '3307',
        //db:     'auditserverdb',
        //user:'root',
        //password :'root',
    },
    //server details
    server: {
        host: '127.0.0.1',
        port: '8888'
    },
    clientConfig:{
        Version:"1.0",
        Contact_Interval:1 ,
        Contact_Delay :60
    }
}
};
module.exports = config;
