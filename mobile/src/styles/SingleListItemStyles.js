import {StyleSheet} from 'react-native';

const singleItemListStyles = StyleSheet.create({
    listItem: {
        alignContent: 'flex-start'
    },
    icon: {
        alignItems: 'center',
        fontSize: 30,
        margin: 1,
    },
    availableIcon: {
        color: '#3b82c4',
    },
    inaccessibleIcon: {
        color: '#3b82c4',
    },
    name: {
        fontSize: 18,
    },
    noteText: {
        fontSize: 15,
        margin: 2,
        padding: 2,
        alignSelf: 'flex-start',
    }
});

module.exports = singleItemListStyles;