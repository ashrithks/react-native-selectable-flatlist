
# react-native-selectable-flatlist
 Single/Multi Select Flatlist

## Getting started

`$ npm install react-native-selectable-flatlist --save`

## DEMO
<p align="center">
  <img src="https://user-images.githubusercontent.com/19853363/58318866-460b7300-7e36-11e9-852a-1ae3400a637a.gif" height="600" title="demo">
</p>

## Usage
```javascript
import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';

class Example extends Component {

  itemsSelected = (selectedItem) => {
    console.log(selectedItem);
  }

  rowItem = (item) => (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 20,
        borderBottomColor: '##dfdfdf'
      }}
    >
      <Text>{item.test}</Text>
    </View>
  )

render(){
  return(
    <View style={styles.container}>
        <SelectableFlatlist
          data={[{ test: 'test1' }, { test: 'test2' }, { test: 'test3' }]}
          state={STATE.EDIT}
          multiSelect={false}
          itemsSelected={(selectedItem) => { this.itemsSelected(selectedItem); }}
          initialSelectedIndex={[0]}
          cellItemComponent={(item, otherProps) => this.rowItem(item)}
        />
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  }
});

export default Example;
```

## Props

| name                      | required |    default     | description |
| ------------------------- | -------- | -------------- | ------------|
| data                      |   yes    |       []       | data is just a plain array. |
| state                     |   yes    |   STATE.EDIT   | STATE.DEFAULT, without selection. STATE.EDIT with selection. |
| cellItemComponent         |   yes    |                | Child row component to render next check/uncheck componenet. |
| touchStyles               |   no     |                | Styles for touch wrapper. |
| renderCheck               |   no     |                | Custom Component to render when a row is checked. |
| checkUncheckContainerStyle|   no     |                | Container style of check/uncheck default component. |
| checkColor                |   no     |     #00FF00    | Default Color of check icon. |
| checkUncheckSize          |   no     |       30       | Size(Number) of check/uncheck icon. |
| checkIcon                 |   no     |                | Custom check icon. |
| renderUncheck             |   no     |                | Custom Component to render when a row is unchecked. |
| uncheckColor              |   no     |     #dfdfdf    | Default Color of uncheck icon. |
| uncheckIcon               |   no     |                | Custom uncheck icon. |
| initialSelectedIndex      |   yes    |                | Array of initially selected item index(Eg:- [0] or [] or [0,1,6]). |
| itemsSelected             |   yes    |                | Callback function when an item checked/unchecked which returns selected items array. |
| multiSelect               |   yes    |      false     | Boolean, single/multi select, true refers to multiselect. |
