// @flow
import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { colors, HeaderRight } from '../../../Components';
import { logOut } from '../../Authentication';
import { openStudentList, type NavigationParams } from './CourseList.actions';
import styles from './CourseList.styles';

// TODO: use server data instead of the mocked one.
const specialties1 = [];
const specialties2 = ['ДЭиВИ', 'ПОиБМС'];
const specialties3 = ['ДЭиВИ', 'ПОиБМС', 'ПОИТ', 'ИСИТ'];
const specialties4 = ['ДЭиВИ', 'ПОиБМС', 'ПОИТ', 'ИСИТ'];
const sections = [
  { title: '1', data: specialties1 },
  { title: '2', data: specialties2 },
  { title: '3', data: specialties3 },
  { title: '4', data: specialties4 }
];

type CourseListProps = {
  navigation: Object,
  onOpenStudentList: (navigationParams: NavigationParams) => void,
  onLogOut: () => void,
}

// FIXME: add keyExtractor and keys to the items.
class CourseList extends React.Component<CourseListProps> {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: <HeaderRight iconName="exit-to-app" onIconPress={ params.onLogOut } />
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ onLogOut: this.props.onLogOut });
  }

  renderItem = ({ item, section }) => (<ListItem
    chevronColor={ colors.greenDark }
    title={ item }
    // eslint-disable-next-line react/jsx-no-bind
    onPress={ () => this.props.onOpenStudentList({
      course: section.title,
      specialty: item
    }) }
  />)

  renderSectionHeader = ({ section: { title } }) => (
    <View style={ styles.headerView }>
      <Text style={ styles.headerText }>
        {`Курс ${title}`}</Text>
    </View>
  )

  render() {
    return (
      <SectionList
        stickySectionHeadersEnabled
        renderItem={ this.renderItem }
        renderSectionHeader={ this.renderSectionHeader }
        sections={ sections }
      />
    );
  }
}

const mapDispatchToProps = {
  onOpenStudentList: openStudentList,
  onLogOut: logOut
};

export default connect(null, mapDispatchToProps)(CourseList);