import mysql from 'mysql'

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "alexisleray", // identifiant BDD
    password: "70d69a330f2bc32420aacbd1408c2abe", // le password
    database:  "alexisleray_blog", // nom de la base de donnée
});


export default pool