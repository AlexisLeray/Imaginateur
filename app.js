import express from "express"
import cors from "cors"
import router from './routes/imaginateurs.js'
import bodyParser from 'body-parser'
import parseurl from 'parseurl'
import session from 'express-session';
import pool from './config/dataBase.js'
import bcrypt from 'bcrypt'
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"))


app.use(session({
	secret: 'keyboard cat',
	resave:false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}))
// =======================MIDDLEWARE===================

 app.use((req, res, next)=>{

     let pathname = parseurl(req).pathname.split('/');
     console.log(pathname);
     let protectedPath = ['profil','creator','admin'];

    //si la session isLogged n'existe pas et que l'url fait partie des urls protégées
     if(!req.session.isAdmin && protectedPath.includes(pathname[1])){
        console.log(1)
          res.redirect('/');
          console.log('non autorisé')
     }
     else{
         next();
     }
 })

app.use('/', router)




 
const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
