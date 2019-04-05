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
        marginBottom: 15,
    },

    //Logo style in login and register panel
    logoStyle: {
        width: 190,
        height: 80,
    },


    //RadioButton

    radioButtonContainer: {
        marginBottom: 15,
    },

    radioButton: {
        marginRight: 30,
        marginLeft: 30,
        borderBottomWidth: 0,
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
    },

    //ScrollView
    scrollView: {
        maxHeight: 340,
    },

    inputFieldsContainer: {
        marginBottom: 20,
    }

});

module.exports = loginRegisterStyles;
