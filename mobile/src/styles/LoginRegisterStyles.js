import { StyleSheet } from 'react-native';

const loginRegisterStyles = StyleSheet.create({
    //Name of app
    title: {
        paddingTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },

    //Background color in register and login panels
    background: {
        flex: 1,
    },

    //Container with logo
    logoContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },

    registerLogoContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 5,
    },

    //Logo style in login and register panel
    logoStyle: {
        width: 190,
        height: 80,
    },


    //CheckBox

    checkBoxContainer: {
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 12,
        borderBottomWidth: 0,
    },

    checkBoxText: {
        marginLeft: 10,
    },

    //Container with action button and link

    buttonAndLinkContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 40,
    },

    registerButtonAndLinkContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    
    //Link to another screen
    linkContainer: {
        marginTop: 30,
        alignItems: 'center',
    },

    linkText: {
        fontSize: 16,
    }
});

module.exports = loginRegisterStyles;
