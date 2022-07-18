import React from 'react';
import {
  Image,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import BaseClass from '../../utils/BaseClass';
import {SafeAreaViewContainer} from '../../utils/BaseStyle';
import {Chip} from 'react-native-paper';
import STRINGS from '../../utils/Strings';
import {Spacer} from '../../components/spacer';
import {ICONS} from '../../utils/ImagePaths';
import COLORS from '../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  GetWizardAction,
  SaveWizardAction,
} from '../../redux/actions/GetWizardAction';
import {CommonActions} from '@react-navigation/native';
import {FONT} from '../../utils/FontSize';
import {FONT_FAMILY} from '../../utils/Font';
import OrientationLoadingOverlay from '../../utils/CustomLoader';
import {
  NewPrimaryButton,
  PrimaryButton,
} from '../../components/buttons/PrimaryButton';
import * as Progress from 'react-native-progress';
import AppConstant from '../../utils/constants';

//const name = ["Education", "Technology", "Food", "Art", "Sports", "Gardening", "Fashion", "Business", "Shopping", "Entrepreneurship", "Shopping", "Health", "Management", "Marketing", "Finance", "Games",]

class WizardScreen extends BaseClass {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      authToken: undefined,
      data: [],
      question: '',
      tagArray: [],
      maxSelection: 0,
      selectedTags: [],
      areAllValuesValid: false,
      moveNextQuestion: 0,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
  }

  onFocusFunction = () => {
    const {authToken} = this.state;
    //Hit get docs Api here
    GetWizardAction(
      {
        // token: authToken
      },
      response => this.handleWizardResponse(response),
    );
    this.showDialog();
  };

  handleWizardResponse = response => {
    const {status, data} = response;
    if (status == '200') {
      this.hideDialog();
      let tempArray =
        data.data.length > 0
          ? data.data
              .sort((a, b) =>
                Number(a.priority) > Number(b.priority) ? 1 : -1,
              )
              .map((item, index) => {
                item.selectedTags = [];
                return item;
              })
          : [];
      this.setState({
        tagArray: tempArray,
      });
    } else {
      this.hideDialog();
      //this.showToastAlert(STRINGS.CHECK_INTERNET);
    }
  };

  // =============================================================================================
  // Render method for Custom Loader
  // =============================================================================================

  _renderCustomLoader = () => {
    const {isLoading} = this.state;
    return (
      <OrientationLoadingOverlay
        visible={isLoading}
        message={STRINGS.LOADING_TEXT}
      />
    );
  };

  onSelectInterest = (item, parentItem, parentIndex) => {
    const {tagArray, selectedTags, maxSelection} = this.state;
    let tempArray = parentItem.selectedTags;
    let parentArray = tagArray;

    if (tempArray.length <= parentItem.maxSelection) {
      parentItem.tags.map(item2 => {
        if (item === item2) {
          if (tempArray.includes(item2)) {
            const ind = tempArray.indexOf(item);
            if (ind > -1) {
              tempArray.splice(ind, 1);
            }
          } else if (tempArray.length < parentItem.maxSelection) {
            tempArray.push(item);
          }
        }
      });
    }

    parentArray[parentIndex].selectedTags = tempArray;
    this.setState({
      tagArray: parentArray,
    });
  };

  // =============================================================================================
  // Render method for Custom Loader
  // =============================================================================================

  _renderCustomLoader = () => {
    const {isLoading} = this.state;
    return (
      <OrientationLoadingOverlay
        visible={isLoading}
        message={STRINGS.LOADING_TEXT}
      />
    );
  };

  onNext = () => {
    const {moveNextQuestion, tagArray} = this.state;
    let intersetAnswer = {};
    tagArray.map((item, index) => {
      if (moveNextQuestion === index) {
        intersetAnswer = {
          username:AppConstant.shared.globalStoredUserInfo.username,
          wizardId: item._id,
          answers: item.selectedTags,
        };
      }
    });
    SaveWizardAction(
      {
        wizard: intersetAnswer,
      },
      response => this.handleSaveWizardResponse(response),
    );
    this.showDialog();
    // }
  };

  // if (tagArray.length - 1 > moveNextQuestion) {
  //   this.setState({moveNextQuestion: moveNextQuestion + 1});
  // } else {
  //   tagArray.map((item, index) => {
  //     answerArray.push({
  //       username: 'rajnish',
  //       wizardId: item._id,
  //       answers: item.selectedTags,
  //     });
  //   });
  //   SaveWizardAction(
  //     {
  //       wizard: answerArray,
  //     },
  //     response => this.handleSaveWizardResponse(response),
  //   );
  //   this.showDialog();
  // }

  handleSaveWizardResponse = response => {
    this.hideDialog();
    const {tagArray, moveNextQuestion} = this.state;
    const {code} = response;
    if (code == 200) {
      if (tagArray.length - 1 > moveNextQuestion) {
        this.setState({moveNextQuestion: moveNextQuestion + 1});
      } else {
        const {navigation} = this.props;
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Tabs',
                params: {data: {edit: false}}, // if you want to send data to home screen
              },
            ],
          }),
        );
      }
    } else {
      console.log("error",response)
    }
  };

  renderItem = (item1, index1) => {
    const {moveNextQuestion} = this.state;
    return (
      <>
        {index1 == moveNextQuestion && (
          <View
            style={{
              paddingVertical: wp(5),
            }}>
            <Text
              style={{
                fontSize: FONT.TextSmall,
                color: COLORS.black_color,
                marginLeft: wp(5),
                fontFamily: FONT_FAMILY.BentonSansMedium,
              }}>
              {item1.question}.
            </Text>
            <Spacer space={2} />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(5),
                width: wp(85),
              }}>
              {item1.tags.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderRadius: wp(4),
                      paddingHorizontal: wp(3.5),
                      paddingVertical: wp(2),
                      margin: wp(1.5),
                      backgroundColor: item1.selectedTags.includes(item)
                        ? COLORS.app_theme_color
                        : COLORS.white_color,
                    }}
                    onPress={() => this.onSelectInterest(item, item1, index1)}>
                    <Text
                      style={{
                        fontSize: FONT.TextSmall_2,
                        color: item1.selectedTags.includes(item)
                          ? COLORS.white_color
                          : COLORS.black_color,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </>
    );
  };

  render() {
    const {navigation} = this.props;
    const {tagArray, moveNextQuestion} = this.state;
    return (
      <>
        <SafeAreaViewContainer style={{}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginTop: wp(5)}}
              onPress={() => navigation.goBack()}>
              <Image
                style={{marginLeft: wp(5), width: wp(5), height: wp(5)}}
                source={ICONS.YELLOW_BACK_ICON}
              />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                marginTop: wp(5),
                justifyContent: 'center',
              }}>
              <Progress.Bar
                progress={
                  tagArray.length > 0
                    ? (moveNextQuestion + 1) / tagArray.length
                    : 0
                }
                color={COLORS.app_theme_color}
                width={wp(80)}
                height={7}
                style={{borderRadius: 4, marginLeft: wp(5)}}
              />
            </View>
          </View>
          <Spacer space={2} />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <FlatList
              data={tagArray}
              renderItem={({item, index}) => this.renderItem(item, index)}
            />
          </View>
          <View style={{alignItems: 'center', width: wp('100%')}}>
            <NewPrimaryButton
              disabled={
                tagArray.length !== 0
                  ? tagArray[moveNextQuestion].selectedTags.length !== 0
                    ? false
                    : true
                  : true
              }
              color={
                tagArray.length > 0
                  ? tagArray[moveNextQuestion].selectedTags.length !== 0
                    ? COLORS.app_theme_color
                    : COLORS.off_grey
                  : COLORS.off_grey
              }
              onPress={() => this.onNext()}
              fontFamily={FONT_FAMILY.BentonSansBold}
              btnText={'NEXT'}
              width={wp(20)}
              borderRadius={wp(3)}
              verticalPaddingWithText={wp('1%')}
              textColor={COLORS.white_color}
            />
          </View>

          {this._renderCustomLoader()}
          <Spacer space={wp('0.5%')} />
        </SafeAreaViewContainer>
      </>
    );
  }
}

export default WizardScreen;
