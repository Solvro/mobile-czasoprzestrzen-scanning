import { StyleSheet, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;

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
        width: deviceWidth,
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
        maxHeight: 300,
        // borderWidth: 1,
        // borderColor: '#000',
    },

    inputFieldsContainer: {
        marginBottom: 20,
        width: deviceWidth,
    },
    
    innerContainer: {
        marginTop: 20,
    },

    stepInfo: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    scrollButton: {
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: '#bdc3c7',
        
    },
    scrollButtonsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10,
    },
});

module.exports = loginRegisterStyles;
