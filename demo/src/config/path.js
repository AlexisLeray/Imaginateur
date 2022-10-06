import Home from '../components/Home'
import Register from '../components/Register'
import Connexion from '../components/Connexion'
import Workshop from '../components/Workshop'
import Galery from '../components/Galery'
import Shop from '../components/Shop'
import Contact from '../components/Contact'
import About from '../components/About'
import ShoppingCart from '../components/ShoppingCart'
import Creator from '../components/Creator'
import Admin from '../components/Admin'
import Profil from '../components/Profil'
import Logout from '../components/Deconnexion'
import Messagerie from '../components/AdminMessage'
import NewPiece from '../components/NewPiece'
import NewCreator from '../components/NewCreator'


// definition des différentes routes avec appel du composant correspondant 
export const routes = [
        {path: '/', element:<Home />},
        {path: '/workshop', element:<Workshop />},
        {path: '/galery', element:<Galery />},
        {path: '/shop', element:<Shop />},
        {path: '/contact', element:<Contact />},
        {path: '/About', element:<About />},
        {path: '/register', element:<Register />},
        {path: '/connexion', element:<Connexion />},
        {path: '/shoppingCart', element:<ShoppingCart />},
        {path: '/creator', element:<Creator />},
        {path: '/admin', element:<Admin />},
        {path: '/profil', element:<Profil />},
        {path: '/logout', element: <Logout />},
        {path: '/admin/getMessage', element: <Messagerie />},
        {path: '/newPiece', element:  <NewPiece />},
        {path: '/admin/newCreator', element: <NewCreator /> }
                
    ]
// route reservée aux personnes connectées
export const userPath= [
        '/profil'
    ]
// route reservée aux crétaeurs connectées
export const creatorsPath= [
        '/creator'
    ]
    // route reservée aux admin connectées
export const adminPath= [
        '/admin', '/getMessage', '/admin/newCreator'
    ]