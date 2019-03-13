import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({

   background: {
    flex: 1,
    color: '#d9e1e8',
    alignItems: 'center',
    },

    topContainer: {
        flexDirection: 'row',
        marginTop: 70,
        marginBottom: 100,
        padding: 0,
    },

    dataContainer: {
        padding: 5,
    },

    textContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 190,
    },

    gradient: {  
        alignItems: 'center', 
        borderRadius: 5 
    },

    icons: {
        fontSize: 35,
        color: '#d9e1e8',
        marginRight: 10,
    },

   logoContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },

    imageStyle: {
        width: 190,
        height: 80,
        marginTop: 60,
        marginBottom: 30,
        shadowColor: '#0d4579',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 5,
        zIndex: 999,
    },
    userDataContainer: {
        flexDirection: 'row',
        padding: 5,
    },
    userDataContainer1: {
        padding: 5,
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    typeText: {
        fontSize: 17,
        color: '#3b82c4',
    },
    dataText: {
        fontSize: 17,
        color: 'black',
    }
});

module.exports = profileStyles;
