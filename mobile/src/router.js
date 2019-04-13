import React from 'react';
import {
    createStackNavigator, createSwitchNavigator, createBottomTabNavigator,
    createDrawerNavigator, createAppContainer
} from 'react-navigation';
import LoginPanel from './login_panel/LoginPanel';
import RegistrationPanel from './registration_panel/RegistrationPanel';
import HomeScreen from './home/HomeScreen';
import ProfileView from './profile/ProfileView';
import ProfileDetailsView from './profile_details/ProfileDetailsView';
import EquipmentList from './equipment/EquipmentList';
import SingleItem from './equipment/SingleItem';
import HistoryView from './history/HistoryView';
import RentEquipmentView from './rent_equipment/RentEquipmentView';
import ReturnEquipmentView from './return_equipment/ReturnEquipmentView';
import Icon from 'react-native-vector-icons/Ionicons';


export const SignedOutNavigator = createStackNavigator(
    {
        SignIn: LoginPanel,
        SignUp: RegistrationPanel,
    },
    {
        headerMode: 'none',
    }
);

export const DrawerNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
        Profile: ProfileView,
        History: HistoryView,
    },
    
);

export const BottomTabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Profile: ProfileView,
        History: HistoryView,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                console.log(routeName);
                if (routeName === 'Home') {
                    iconName = 'md-home';
                } else if (routeName === 'Profile') {
                    iconName = 'md-person';
                } else if (routeName === 'History') {
                    iconName = 'md-time';
                }

                return <Icon name={iconName} size={25} color={tintColor} />;
            },

        }),
        tabBarOptions: {
            activeTintColor: '#3b82c4',
            inactiveTintColor: 'gray',
        },
    }
);

export const MainNavigator = createStackNavigator(
    {
        //Menu: DrawerNavigator,
        Menu: BottomTabNavigator,
        Home: HomeScreen,
        Equipment: EquipmentList,
        Item: SingleItem,
        Rent: RentEquipmentView,
        Return: ReturnEquipmentView,
        ProfileDetails: ProfileDetailsView,
    },
    {
        headerMode: 'none',
    }
);

export const SwitchNavigator = createSwitchNavigator(
    {
        SignedOut: SignedOutNavigator,
        SignedIn: MainNavigator,
    },
    {
        initialRouteName: 'SignedOut',
    }
);


const AppContainer = createAppContainer(SwitchNavigator);
export default AppContainer; 