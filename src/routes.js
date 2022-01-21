import Header from "./components/Header";
import SignIn from './components/SignIn';
import Trade from './components/Trade';
import MyAssets from './components/MyAssets';
import Welcome from './components/Welcome';

export default [
    {
        path: '/',
        component: Header,
    },
    {
        path: '/signIn',
        component: SignIn
    },
    {
        path: '/welcome',
        component: Welcome
    },
    {
        path: '/trade',
        component: Trade
    },
    {
        path: '/myAssets',
        component: MyAssets
    },
]