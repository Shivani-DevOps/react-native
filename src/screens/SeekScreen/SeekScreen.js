import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import COLORS from '../../utils/Colors';
import {SafeAreaViewContainer} from '../../utils/BaseStyle';
import {AppIconAndNameViewComponent} from '../../components/staticUiComponents';
import {CustomSearchBar} from '../../components/searchBar';
import {Spacer} from '../../components/spacer';
import LinearGradient from 'react-native-linear-gradient';
import {SeekQuestionComponent} from './seekScreenComponents/seekQuestionComponent';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {GetSumOfSpecificKeyValueInArray} from '../../utils/helpers';
import {SearchTypeTab} from './seekScreenComponents/searchTypeTab';
import * as _ from 'lodash';
import {FONT_FAMILY} from '../../utils/Font';
import {FONT} from '../../utils/FontSize';
import {ICONS} from '../../utils/ImagePaths';
import {
  CheckPollExistsApi,
  GetPollsApi,
  SearchSeekApi,
  VoteOnPollApi,
} from '../../redux/actions/SeekTabActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const staticOptionsData = [
  {
    _id: '615c356d65842c2ff44bb485',
    value: 'Yes',
    votes: 6,
    isSelected: false,
  },
  {
    _id: '615c356d65842c2ff44bb486',
    value: 'No',
    votes: 14,
    isSelected: false,
  },
  {
    _id: '615c356d65842c2ff44bb487',
    value: "I really don't care",
    votes: 9,
    isSelected: false,
  },
];

const image = [
  {
    url: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?cs=srgb&dl=pexels-elina-fairytale-3822621.jpg&fm=jpg',
    height: 25,
    name: 'Dummy result for Ui purpose',
  },
  {
    url: 'https://images.pexels.com/photos/3822646/pexels-photo-3822646.jpeg?cs=srgb&dl=pexels-elina-fairytale-3822646.jpg&fm=jpg',
    height: 65,
    name: 'Dummy result for Ui purpose',
  },
  {
    height: 25,
    url: 'https://images.pexels.com/photos/3823075/pexels-photo-3823075.jpeg?cs=srgb&dl=pexels-elina-fairytale-3823075.jpg&fm=jpg',
    name: 'Dummy result for Ui purpose',
  },
  {
    height: 55,
    url: 'https://images.pexels.com/photos/4708514/pexels-photo-4708514.jpeg?cs=srgb&dl=pexels-anthony-shkraba-4708514.jpg&fm=jpg',
    name: 'Dummy result for Ui purpose',
  },
  {
    height: 35,
    url: 'https://images.pexels.com/photos/999309/pexels-photo-999309.jpeg?cs=srgb&dl=pexels-the-lazy-artist-gallery-999309.jpg&fm=jpg',
    name: 'Dummy result for Ui purpose',
  },
  {
    height: 70,
    url: 'https://images.pexels.com/photos/4324101/pexels-photo-4324101.jpeg?cs=srgb&dl=pexels-cottonbro-4324101.jpg&fm=jpg',
    name: 'Dummy result for Ui purpose',
  },
  {
    height: 75,
    url: 'https://images.pexels.com/photos/374632/pexels-photo-374632.jpeg?cs=srgb&dl=pexels-burst-374632.jpg&fm=jpg',
    name: 'Dummy result for Ui purpose',
  },
  {
    height: 85,
    url: 'https://images.pexels.com/photos/2597205/pexels-photo-2597205.jpeg?cs=srgb&dl=pexels-felipe-borges-2597205.jpg&fm=jpg',
    name: 'Dummy result for Ui purpose',
  },
  {
    height: 95,
    url: 'https://images.pexels.com/photos/2018242/pexels-photo-2018242.jpeg?cs=srgb&dl=pexels-lucas-pezeta-2018242.jpg&fm=jpg',
    name: 'Dummy result for Ui purpose',
  },
];

export default function SeekScreen({navigation}) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Accounts');
  const [questionText, setQuestionText] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [optionsData, setOptionsData] = useState([]);
  const [pollId, setPollId] = useState('');
  const [canShowPolls, setCanShowPolls] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    const deviceToken = await AsyncStorage.getItem('loginToken');
    console.warn('devie', deviceToken);
    CheckPollExistsApi(
      {
        token: deviceToken,
      },
      response => handleCheckPollExistsResponse(response, deviceToken),
    );
  }, []);

  const handleCheckPollExistsResponse = (response, deviceToken) => {
    console.warn('response1', response);
    if (response !== 'Network Error') {
      const {status, code, data, message} = response;
      if (code == '200') {
        if (status == 'true') {
          GetPollsApi(
            {
              token: deviceToken,
            },
            res => handleGetPollsResponse(res),
          );
        } else {
          setCanShowPolls(false);
        }
      } else if (code == '401') {
      } else if (code == '400') {
      }
    } else {
    }
  };

  const handleGetPollsResponse = response => {
    console.warn('response2', response);
    if (response !== 'Network Error') {
      const {code, data, message} = response;
      if (code == '200') {
        if (data.length > 0) {
          let tempArray = _.map(data[0].choices, (item, index) => {
            item.isSelected = false;
            return item;
          });
          console.warn('teamp', tempArray);
          setCanShowPolls(true);
          setQuestionText(data[0].question);
          setIsAnswered(data[0].userStatus == 'true' ? true : false);
          setOptionsData(tempArray);
          setPollId(data[0]._id);
        }
      } else if (code == '401') {
      } else if (code == '400') {
      }
    } else {
    }
  };

  const onPollOptionSelect = async selectedOption => {
    const deviceToken = await AsyncStorage.getItem('loginToken');
    const userId = await AsyncStorage.getItem('loginUserId');

    let payload = JSON.stringify({
      userId: userId,
      pollId: pollId,
      choiceId: selectedOption._id,
    });
    VoteOnPollApi(
      {
        token: deviceToken,
        data: payload,
      },
      response => handleVoteOnPollResponse(response),
    );
  };

  const handleVoteOnPollResponse = response => {
    console.warn('response3', response);
    if (response !== 'Network Error') {
      const {code, data, message} = response;
      if (code == '200') {
        if (data) {
          let tempArray = _.map(data.choices, (item, index) => {
            item.isSelected = false;
            return item;
          });

          setCanShowPolls(true);
          setQuestionText(data.question);
          setIsAnswered(true);
          setOptionsData(tempArray);
          setPollId(data._id);
        }
      } else if (code == '401') {
      } else if (code == '400') {
      }
    } else {
    }
  };

  const onSearch = searchText => {
    SearchSeekApi(
      {
        data: JSON.stringify({input: searchText}),
      },
      response => handleSearchResponse(response),
    );
  };

  const handleSearchResponse = response => {
    console.warn('response4', response);
    if (response !== 'Network Error') {
      const {code, document, message} = response;
      if (code == '200') {
        if (document) {
          setSearchResults(document);
        } else {
          setSearchResults([]);
        }
      } else if (code == '401') {
      } else if (code == '400') {
      } else if (code == '404') {
        setSearchResults([]);
      } else if (code == '422') {
        setSearchResults([]);
      }
    } else {
    }
  };

  return (
    <SafeAreaViewContainer style={{backgroundColor: COLORS.app_theme_color}}>
      <ScrollView
        bounces={false}
        style={{
          flex: 1,
          backgroundColor: '#F2F2F2',
          marginTop: Platform.OS == 'android' ? 43 : 0,
        }}>
        <LinearGradient
          colors={['#F2F2F2', '#F2F2F2']}
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLORS.white_color,
          }}>
          <AppIconAndNameViewComponent title={'Seek'} subTitle={'SPARKS'} />
          {canShowPolls ? (
            <>
              {isSearchVisible ? (
                <>
                  <Spacer space={2} />
                  <CustomSearchBar
                    onSearch={searchText => {
                      onSearch(searchText);
                      console.warn('on search text', searchText);
                    }}
                    onClearSearch={() => {
                      setSearchResults([]);
                      console.warn('on clear search Text');
                    }}
                  />
                  <Spacer space={2} />
                  <SearchTypeTab
                    onSelectTab={selectedType => setActiveTab(selectedType)}
                  />
                  <Spacer space={4} />
                  <View style={{width: wp(100), paddingHorizontal: wp(5)}}>
                    {_.map(
                      activeTab == 'Accounts' ? searchResults : image,
                      (item, index) => {
                        switch (activeTab) {
                          case 'Accounts':
                            return (
                              <View
                                style={{
                                  marginBottom: wp(5),
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  style={{
                                    height: wp(12),
                                    width: wp(12),
                                    borderRadius: wp(1.5),
                                  }}
                                  source={{uri: item.profile_image}}
                                />
                                <Spacer row={2} />
                                <View
                                  style={{
                                    width: wp(75),
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: COLORS.light_black,
                                      fontWeight: '500',
                                      fontFamily: FONT_FAMILY.MontserratMedium,
                                      fontSize: FONT.TextSmall,
                                    }}>
                                    {item.profileName}
                                  </Text>
                                </View>
                              </View>
                            );
                          case 'Spark Tag':
                            return (
                              <View
                                style={{
                                  marginBottom: wp(5),
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    borderRadius: wp(5),
                                    borderWidth: 1,
                                    borderColor: COLORS.app_theme_color,
                                    width: wp(10),
                                    height: wp(10),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: COLORS.light_black,
                                      fontFamily:
                                        FONT_FAMILY.MontserratSemiBold,
                                      fontSize: FONT.TextSmall,
                                    }}>
                                    #
                                  </Text>
                                </View>
                                <Spacer row={2} />
                                <View
                                  style={{
                                    width: wp(75),
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: COLORS.light_black,
                                      fontWeight: '500',
                                      fontFamily: FONT_FAMILY.MontserratMedium,
                                      fontSize: FONT.TextSmall,
                                    }}>
                                    {item.name}
                                  </Text>
                                  <Text
                                    style={{
                                      opacity: 0.4,
                                      color: COLORS.light_black,
                                      fontWeight: '500',
                                      fontFamily: FONT_FAMILY.MontserratMedium,
                                      fontSize: FONT.TextExtraSmall,
                                    }}>
                                    12{index}k posts
                                  </Text>
                                </View>
                              </View>
                            );
                          case 'Business':
                            return (
                              <View
                                style={{
                                  marginBottom: wp(5),
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  style={{
                                    height: wp(12),
                                    width: wp(12),
                                    borderRadius: wp(2),
                                  }}
                                  source={{uri: item.url}}
                                />
                                <Spacer row={2} />
                                <View
                                  style={{
                                    width: wp(75),
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: COLORS.light_black,
                                      fontWeight: '500',
                                      fontFamily: FONT_FAMILY.MontserratMedium,
                                      fontSize: FONT.TextSmall,
                                    }}>
                                    {item.name}
                                  </Text>
                                </View>
                              </View>
                            );

                          case 'Location':
                            return (
                              <View
                                style={{
                                  marginBottom: wp(5),
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    borderRadius: wp(5),
                                    borderWidth: 1,
                                    borderColor: COLORS.app_theme_color,
                                    width: wp(10),
                                    height: wp(10),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image source={ICONS.SEARCH_LOCATION_ICON} />
                                </View>
                                <Spacer row={2} />
                                <View
                                  style={{
                                    width: wp(75),
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: COLORS.light_black,
                                      fontWeight: '500',
                                      fontFamily: FONT_FAMILY.MontserratMedium,
                                      fontSize: FONT.TextSmall,
                                    }}>
                                    {item.name}
                                  </Text>
                                  <Text
                                    style={{
                                      opacity: 0.4,
                                      color: COLORS.light_black,
                                      fontWeight: '500',
                                      fontFamily: FONT_FAMILY.MontserratMedium,
                                      fontSize: FONT.TextExtraSmall,
                                    }}>
                                    12{index} Calea Victorie
                                  </Text>
                                </View>
                              </View>
                            );
                        }
                      },
                    )}
                  </View>
                </>
              ) : (
                <>
                  <Spacer space={1.5} />
                  <SeekQuestionComponent
                    questionText={questionText}
                    options={optionsData}
                    isAnswered={isAnswered}
                    totalVotes={GetSumOfSpecificKeyValueInArray(
                      optionsData,
                      'votes',
                    )}
                    onOptionSelect={(selectedItem, selectedIndex) => {
                      onPollOptionSelect(selectedItem);
                    }}
                  />
                  <Spacer space={2} />
                  <CustomSearchBar
                    isDisabled={true}
                    onDisabledSearchPress={() => setIsSearchVisible(true)}
                  />
                  <Spacer space={2} />
                  <View style={{flexDirection: 'row', width: wp(100)}}>
                    <View
                      style={{
                        paddingLeft: wp(1),
                        alignItems: 'flex-start',
                        width: wp(50),
                      }}>
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[0].height),
                        }}
                        source={{uri: image[0].url}}
                      />
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[1].height),
                        }}
                        source={{uri: image[1].url}}
                      />
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[2].height),
                        }}
                        source={{uri: image[2].url}}
                      />
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[3].height),
                        }}
                        source={{uri: image[3].url}}
                      />
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[4].height),
                        }}
                        source={{uri: image[4].url}}
                      />
                    </View>
                    <View
                      style={{
                        paddingRight: wp(1),
                        alignItems: 'flex-end',
                        width: wp(50),
                      }}>
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[4].height),
                        }}
                        source={{uri: image[5].url}}
                      />
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[3].height),
                        }}
                        source={{uri: image[6].url}}
                      />
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[2].height),
                        }}
                        source={{uri: image[7].url}}
                      />
                      <Image
                        style={{
                          marginBottom: wp(1),
                          width: wp(48.5),
                          height: wp(image[1].height),
                        }}
                        source={{uri: image[1].url}}
                      />
                    </View>
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              <Spacer space={2} />
              <CustomSearchBar
                isDisabled={true}
                onDisabledSearchPress={() => setIsSearchVisible(true)}
              />
              <Spacer space={2} />
              <View style={{flexDirection: 'row', width: wp(100)}}>
                <View
                  style={{
                    paddingLeft: wp(1),
                    alignItems: 'flex-start',
                    width: wp(50),
                  }}>
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[0].height),
                    }}
                    source={{uri: image[0].url}}
                  />
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[1].height),
                    }}
                    source={{uri: image[1].url}}
                  />
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[2].height),
                    }}
                    source={{uri: image[2].url}}
                  />
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[3].height),
                    }}
                    source={{uri: image[3].url}}
                  />
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[4].height),
                    }}
                    source={{uri: image[4].url}}
                  />
                </View>
                <View
                  style={{
                    paddingRight: wp(1),
                    alignItems: 'flex-end',
                    width: wp(50),
                  }}>
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[4].height),
                    }}
                    source={{uri: image[4].url}}
                  />
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[3].height),
                    }}
                    source={{uri: image[3].url}}
                  />
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[2].height),
                    }}
                    source={{uri: image[2].url}}
                  />
                  <Image
                    style={{
                      marginBottom: wp(1),
                      width: wp(48.5),
                      height: wp(image[1].height),
                    }}
                    source={{uri: image[1].url}}
                  />
                </View>
              </View>
            </>
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaViewContainer>
  );
}
