import { StyleSheet } from 'react-native';

const equipmentListStyles = StyleSheet.create({
    card: {
        //borderColor: '#3b82c4',
        //borderWidth: 3,
        marginRight: 10,
        marginLeft: 10,
        fontFamily: 'Roboto_medium',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',

    },

    cardItem: {
        borderBottomWidth: 1,
        borderColor: '#8b8e93',
        padding: 2,
        margin: 0,
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
    },

    itemInfo: {
        fontSize: 13,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },

    titleText: {
        fontSize: 15,
        marginRight: 5,
        fontWeight: '100',
    },

    description: {
        position: 'absolute',
        right: 0,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
    },
    icon: {
        fontSize: 40, 
        marginRight: 20,
        position: 'absolute',
        right: 0,
    },

    searchIcon: {
        fontSize: 35,
        marginRight: 20,
        marginBottom: 0,
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
        flexDirection: 'row',
    },

    inputField: {
        padding: 4,
        fontSize: 20,
    },

});

module.exports = equipmentListStyles;
