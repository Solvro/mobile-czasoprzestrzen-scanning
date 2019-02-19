import { StyleSheet } from 'react-native';

const equipmentListStyles = StyleSheet.create({
    card: {
        borderColor: '#3b82c4',
        borderWidth: 3,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',

    },

    cardItem: {
        borderBottomColor: '#3b82c4',
        borderBottomWidth: 2,
        padding: 2,
    },

    itemInfo: {
        fontSize: 13,
        marginBottom: 0,
    },

    titleText: {
        fontSize: 15,
        marginRight: 5,
        fontWeight: 'bold',
    },

    icon: {
        fontSize: 25, 
    },

    container: {
        marginTop: 20,
    },

    //Style of input field for login and registration panels
    input: {
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 12,
        marginTop: 10,
        borderColor: '#3b82c4',
        borderBottomWidth: 2,
    },

    inputField: {
        padding: 4,
        fontSize: 20,
    },

});

module.exports = equipmentListStyles;
