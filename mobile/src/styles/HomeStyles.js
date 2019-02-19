import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({

    title: {
        paddingTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },

   background: {
    flex: 1,
    },

    actionButton: {
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: '#3b82c4',
        marginRight: 50,
        marginLeft: 50,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 27,
    },

   logoContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },

    logoStyle: {
        width: 190,
        height: 80,
    }
});

module.exports = homeStyles;
