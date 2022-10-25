import Home from '../components/Home'
import Register from '../components/Register'
import Connexion from '../components/Connexion'
import Galery from '../components/Articles'
import Shop from '../components/Shop'
import Contact from '../components/Contact'
import About from '../components/About'
import ShoppingCart from '../components/ShoppingCart'
import Creator from '../components/Creator'
import Admin from '../components/Admin'
import Logout from '../components/Deconnexion'
import Messagerie from '../components/AdminMessage'
import NewPiece from '../components/NewPiece'
import NewCreator from '../components/NewCreator'
import MyGalery from '../components/MyGalery'
import UpdateProduct from '../components/UpdateProduct'
import Payment from '../components/Payment'
import UpdateArticle from '../components/UpdateArticle'
import ModifyProfil from '../components/ModifyProfil'

// definition des différentes routes avec appel du composant correspondant 
export const routes = [
        {path: '/', element:<Home />},
        {path: '/galery', element:<Galery />},
        {path: '/shop', element:<Shop />},
        {path: '/contact', element:<Contact />},
        {path: '/About', element:<About />},
        {path: '/register', element:<Register />},
        {path: '/connexion', element:<Connexion />},
        {path: '/panier/:id', element:<ShoppingCart />},
        {path: '/creator/:id', element:<Creator />},
        {path: '/admin', element:<Admin />},
        {path: '/logout', element: <Logout />},
        {path: '/admin/getMessage', element: <Messagerie />},
        {path: '/newPiece', element:  <NewPiece />},
        {path: '/admin/newCreator', element: <NewCreator /> },
        {path: '/myGalery', element: <MyGalery />},
        {path: '/update/:id', element: <UpdateProduct />},
        {path: '/payment/:id', element: <Payment />},
        {path: '/galery', element: <Galery />},
        {path: '/updateArticle/:id', element: <UpdateArticle />},
        {path: '/updateProfil/:id', element: <ModifyProfil />}
    ]
// route reservée aux personnes connectées
export const userPath= [
        '/profil'
    ]
// route reservée aux crétaeurs connectées
export const creatorsPath= [
        '/creator/:id', '/myGalery'
    ]
    // route reservée aux admin connectées
export const adminPath= [
        '/admin', '/getMessage', '/admin/newCreator'
    ]