import { createStackNavigator } from 'react-navigation';
import Root from './Root';
import Register from './Register';
import Login from './Login';
import Help from './Help';
import ContactUs from './ContactUs';
import ModifyUser from "./ModifyUser";
import ModifyUserName from './ModifyInfo/ModifyUserName';
import ModifyUserEmail from './ModifyInfo/ModifyUserEmail';
import ModifyUserPassword from './ModifyInfo/ModifyUserPassword';
import ModifyUserPhone from './ModifyInfo/ModifyUserPhone';
import ModifySensorPosition from './ModifyInfo/ModifySensorPosition';

const RootStack = createStackNavigator({
    Home: Root,
    Register:Register,
    Login:Login,
    Help:Help,
    ContactUs:ContactUs,
    ModifyUser:ModifyUser,
    ModifyUserName:ModifyUserName,
    ModifyUserEmail:ModifyUserEmail,
    ModifyUserPassword:ModifyUserPassword,
    ModifyUserPhone:ModifyUserPhone,
    ModifySensorPosition:ModifySensorPosition
},{headerMode: 'none'},{
    initialRouteName:'Home'
},);

export default RootStack;