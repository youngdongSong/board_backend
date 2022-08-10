import knex  from 'knex';


export default  knex({ 
     client: 'mysql2',  
        connection: {    
        host :process.env.DB_HOST,   
        port: Number(process.env.DB_PORT),
         user : process.env.DB_USER,    
        password :process.env.DB_PASS,    
        database :process.env.DB_DBNMAE,
        pool :{
            min : 0,
            max : 100
        }
}});


