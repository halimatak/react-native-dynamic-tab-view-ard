import React from 'react';
import { Button, TouchableHighlight, Text, FlatList, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');
class DynamicTabViewScrollHeader extends React.Component {
  constructor(props) {
    super(props);
    this.defaultStyle = DynamicdefaultStyle;
    this.state = {
      selected: this.props.selectedTab
    };
  }

  _onPressHeader = index => {
    this.props.goToPage(index);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTab !== this.props.selectedTab) {
      this.setState({ selected: nextProps.selectedTab });
    }
  }

  _renderTitle = ({ item, index }) => {
    let isTabActive = index === this.state.selected;
    //let fontWeight = isTabActive ? 'bold' : 'normal';
    let HeaderTextStyle = isTabActive ? (this.props.selectectedHeaderTextStyle ?? this.props.headerTextStyle) : this.props.headerTextStyle
    return (
      <TouchableHighlight
        onPress={this._onPressHeader.bind(this, index)}
        style={[
          this.defaultStyle.tabItemContainer,
          { backgroundColor: this.props.headerBackgroundColor }
        ]}
        underlayColor={this.props.tabPressingColor ?? '#f2f2f2'}
      >
        <View style={[this.defaultStyle.tabHeaderView, {width: (width / this.props.data.length)}]}>
          <Text
            style={[
              //{ fontWeight: fontWeight },
              this.defaultStyle.tabItemText,
              HeaderTextStyle
            ]}
          >
            {item['title']}
          </Text>
          {this._renderHighlight(isTabActive)}
        </View>
      </TouchableHighlight>
    );
  };

  _renderHighlight = showHighlight => {
    if (showHighlight) {
      return (
        <View
          style={[
            this.defaultStyle.highlight,
            this.props.highlightStyle,
            { backgroundColor: this.props.headerUnderlayColor }
          ]}
        />
      );
    } else {
      return (
        <View
          style={[this.defaultStyle.noHighlight, this.props.noHighlightStyle]}
        />
      );
    }
  };

  scrollHeader = index => {
    this.headerView.scrollToIndex({ index, animated: true });
  };

  render() {
    return (
      <FlatList
        horizontal
        alwaysBounceHorizontal={false}
        ref={headerView => {
          this.headerView = headerView;
        }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={this.props.data}
        extraData={this.state}
        renderItem={this._renderTitle}
        style={[
          this.defaultStyle.headerStyle,
          { backgroundColor: this.props.headerBackgroundColor }
        ]}
      />
    );
  }
}

DynamicdefaultStyle = {
  headerStyle: {
    width: '100%',
    padding: 0,
    paddingBottom: 0,
    paddingTop: 13,

  },
  tabItemText: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    marginBottom: 3,
  },
  tabItemContainer: {
    overflow: 'hidden',
    backgroundColor: '#555555',
    padding: 0,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex:1,
  },
  highlight: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 5
  },
  noHighlight: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 5
  },
  tabHeaderView: {
    width: '100%',
  }
};

DynamicTabViewScrollHeader.defaultProps = {
  selectedTab: 0,
  headerBackgroundColor: '#555555',
  headerUnderlayColor: '#00000033'
};

DynamicTabViewScrollHeader.propTypes = {
  goToPage: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  headerBackgroundColor: PropTypes.any,
  headerTextStyle: PropTypes.any,
  selectectedHeaderTextStyle: PropTypes.any,
  highlightStyle: PropTypes.any,
  noHighlightStyle: PropTypes.any,
  headerUnderlayColor: PropTypes.any
};

export default DynamicTabViewScrollHeader;
