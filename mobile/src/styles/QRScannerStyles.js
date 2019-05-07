import {StyleSheet} from 'react-native';

const qrScannerStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      },
      bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 15,
        flexDirection: 'row',
      },
      url: {
        flex: 1,
      },
      urlText: {
        color: '#fff',
        fontSize: 20,
      },
      cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
      },
      datePickerContainer: {
        borderBottomColor: '#3b82c4',
        borderBottomWidth: 2,
        marginRight: 5,
        width: 200,
      },
      rentButton: {
        backgroundColor: '#3b82c4',
        marginLeft: 5,
      },
});

module.exports = qrScannerStyles;