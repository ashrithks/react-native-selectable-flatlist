import React, { Component } from 'react';
import { FlatList, View, ViewPropTypes } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import TouchableWrapper from './TouchableWrapper';
import styles from './Styles/styles';

export const STATE = {
  DEFAULT: 'default',
  EDIT: 'edit'
}

class SelectableFlatlist extends Component {
  static propTypes = {
    ...ViewPropTypes,
    data: PropTypes.array.isRequired,
    state: PropTypes.oneOf([STATE.DEFAULT, STATE.EDIT]).isRequired,
    cellItemComponent: PropTypes.any,
    touchStyles: PropTypes.any,
    renderCheck: PropTypes.any,
    checkUncheckContainerStyle: PropTypes.any,
    checkColor: PropTypes.string,
    checkUncheckSize: PropTypes.number,
    checkIcon: PropTypes.any,
    renderUncheck: PropTypes.any,
    uncheckColor: PropTypes.string,
    uncheckIcon: PropTypes.any,
    initialSelectedIndex: PropTypes.array.isRequired,
    itemsSelected: PropTypes.func.isRequired,
    multiSelect: PropTypes.bool.isRequired
  };

  static defaultProps = {
    data: [],
    state: STATE.EDIT,
    multiSelect: false
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

  componentDidMount() {
    this.prepareInitialList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data && !lodash.isEqual(this.props.data, prevProps.data)) {
      this.prepareInitialList();
    } else if (this.props.state && !lodash.isEqual(this.props.state, prevProps.state)) {
      this.prepareInitialList();
    }
  }

  onItemSelected = (item) => {
    const { multiSelect, itemsSelected } = this.props;
    let selectedItems = this.state.selectedItems.slice();
    if (!multiSelect) {
      selectedItems = [item];
      this.setState({ selectedItems }, () => {
        itemsSelected(selectedItems);
      });
    } else {
      const itemIndexFound = lodash.find(selectedItems,
        (element) => (element === item));
      if (itemIndexFound) {
        lodash.pull(selectedItems, item);
      } else {
        selectedItems.push(item);
      }
      this.setState({ selectedItems }, () => {
        itemsSelected(selectedItems);
      });
    }
  }

  prepareInitialList = () => {
    const { data, initialSelectedIndex, state, itemsSelected } = this.props;
    if (state === STATE.DEFAULT) {
      this.setState({ selectedItems: [] }, () => {
        itemsSelected([]);
      });
    } else {
      const itemSelected = [];
      data.forEach((element, i) => {
        const itemIndexFound = lodash.find(initialSelectedIndex,
          (item) => (item === i));
        if (typeof itemIndexFound === 'number') {
          itemSelected.push(element);
        }
      });
      this.setState({ selectedItems: itemSelected }, () => {
        itemsSelected(itemSelected);
      });
    }
  }

  isItemSelected = (item) => {
    const { selectedItems } = this.state;
    const itemSelected = lodash.find(selectedItems,
      (element) => (element === item));
    if (itemSelected) {
      return true;
    }
    return false;
  }


  keyExtractor = (item, index) => `${index}`;

  renderUncheck = () => {
    const { renderUncheck, checkUncheckContainerStyle, uncheckColor, checkUncheckSize, uncheckIcon } = this.props;
    if (renderUncheck) {
      return renderUncheck();
    }
    return (
      <View
        style={[styles.defaultContainer, checkUncheckContainerStyle]}>
        {
          uncheckIcon ?
            uncheckIcon()
            :
            <MaterialCommunityIcons
              name={'check-circle-outline'}
              color={uncheckColor ? uncheckColor : '#dfdfdf'}
              size={checkUncheckSize ? checkUncheckSize : 30}
            />
        }
      </View>
    )
  }

  renderCheck = () => {
    const { renderCheck, checkUncheckContainerStyle, checkColor, checkUncheckSize, checkIcon } = this.props;
    if (renderCheck) {
      return renderCheck();
    }
    return (
      <View
        style={[styles.defaultContainer, checkUncheckContainerStyle]}>
        {
          checkIcon ?
            checkIcon()
            :
            <MaterialCommunityIcons
              name={'check-circle'}
              color={checkColor ? checkColor : '#00FF00'}
              size={checkUncheckSize ? checkUncheckSize : 30}
            />
        }
      </View>
    )
  }

  renderItem = ({ item }) => {
    const { state, cellItemComponent, touchStyles } = this.props;
    if (state === STATE.DEFAULT) {
      return (
        cellItemComponent(item, { ...this.props })
      );
    }
    return (
      <TouchableWrapper
        touchStyles={[styles.defaultTouch, touchStyles]}
        onPress={() => {
          this.onItemSelected(item);
        }}
      >
        {
          this.isItemSelected(item) ?
            this.renderCheck()
            :
            this.renderUncheck()
        }
        {
          cellItemComponent(item, { ...this.props })
        }
      </TouchableWrapper>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state.selectedItems}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

export default SelectableFlatlist;
