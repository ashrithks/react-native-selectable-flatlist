import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  defaultTouch: {
    width: screenWidth,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  defaultContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});


export default styles;
