import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
    // Button styles
    actionButton: {
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#3b82c4',
        marginRight: 50,
        marginLeft: 50,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
        flexDirection: 'row',
        width: 250,
    },

    buttonContainer: {  
        alignItems: 'center', 
        shadowColor: '#0d4579',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
        zIndex: 999,
        padding: 20,
    },

    textContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 190,
    },

    buttonText: {
        color: '#fff',
        fontSize: 27,
    },

    icons: {
        fontSize: 27,
        color: '#d9e1e8',
    },

});

module.exports = buttonStyles;