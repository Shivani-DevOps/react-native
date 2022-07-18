import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../../utils/FontSize';
import COLORS from '../../utils/Colors';
import {FONT_FAMILY} from '../../utils/Font';
import STRINGS from '../../utils/Strings';
import styles from './styles';
import {Spacer} from '../../components/spacer';
import {SafeAreaViewContainer} from '../../utils/BaseStyle';
import LiveUserItem from './components/liveuseritem';
import FeedItem from './components/feeditem';
import FellowSeekerItem from './components/fellowseeketitem';
import {GetAllVideosAction} from '../../redux/actions/UploadVideoAction';
import {showToastAlert} from '../../components/Toast';
import {Indicator, IndicatorAppearance} from '../../components/indicator';
import {EventRegister} from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pagination from '../../utils/pagination';
import {CommonActions} from '@react-navigation/routers';
import {RemoveAllStoredDataFromAsyncStorage} from '../../utils/constants';

export default function StreamScreen(props) {
  const {route, navigation} = props;
  const [arrVideos, setArrVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isPullToRefresh, setIsPullToRefresh] = useState(false);
  const [tempKey, setTempKey] = useState('');
  var pagination = useRef(new Pagination(0, 10));

  useEffect(() => {
    getVideoListAPI();
    EventRegister.addEventListener('VideoUploaded', async data => {
      getVideoListAPI();
    });
  }, []);
  /**
   * It is used to render refresh control UIs.
   */
  const renderTopUIs = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.app_theme_color,
        }}>
        <Image
          source={require('../../assets/images/logo2.png')}
          style={styles.image}
        />
        <Text style={styles.streamText}>Stream</Text>
        <Text style={styles.sparkText}>SPARKS</Text>
      </View>
    );
  };

  /**
   * It is used to render live user item UIs.
   */
  const renderLiveUserItems = (item, index) => {
    return <LiveUserItem />;
  };

  /**
   * It is used to render live users horizontal items lists UIs.
   */
  const renderLivesListUsersUIs = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: COLORS.app_theme_color,
            height: 60,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}></View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 59,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}></View>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 17}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 1, 2, 3, 4]}
          renderItem={({item, index}) => renderLiveUserItems(item, index)}
          // keyExtractor={item => item._id}
        />
      </View>
    );
  };

  /**
   * It is used to render live user item UIs.
   */
  const renderFeedItems = (item, index) => {
    // if (index == 0) {
    //   return renderTopUIs();
    // } else if (index == 1) {
    //   return renderLivesListUsersUIs();
    // } else if (index == 2) {
    //   return <FeedItem />;
    // } else if (index == 3) {
    //   return <FeedItem />;
    // } else if (index == 4) {
    //   return renderFelloSeekerList();
    // }
    return <FeedItem key={item.id + tempKey} objVideo={item} />;
  };

  /**
   * It will render returnGemLayoutForSectionList.
   */
  function updateSelectedLineOnScroll(viewableItems) {
    if (viewableItems.length > 0) {
    }
  }

  /**
   * It is used to render refresh control UIs.
   */
  const renderRefreshControlUIs = () => {
    return (
      <RefreshControl
        tintColor={COLORS.white_color}
        refreshing={isPullToRefresh}
        onRefresh={() => getVideoListAPI(true, true, false)}
      />
    );
  };

  /**
   * It is used to render live users horizontal items lists UIs.
   */
  const renderFeedListUIs = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.app_theme_color,
          marginTop: Platform.OS == 'android' ? 43 : 0,
        }}>
        <FlatList
          maxToRenderPerBatch={20}
          extraData={arrVideos}
          data={arrVideos}
          ListHeaderComponent={
            <>
              {renderTopUIs()}
              {/* {renderLivesListUsersUIs()} */}
            </>
          }
          refreshControl={renderRefreshControlUIs()}
          renderItem={({item, index}) => renderFeedItems(item, index)}
          ListFooterComponent={() => isLoadMore && renderListFooterUIs()}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={1.0}
          // onViewableItemsChanged={({viewableItems, changed}) =>
          //   updateSelectedLineOnScroll(viewableItems)
          // }
          keyExtractor={item => item.id}
        />
        {/* <ScrollView>
          <FeedItem />
          {renderFelloSeekerList()}
          <FeedItem />
          {renderFelloSeekerList()}
          <FeedItem />
        </ScrollView> */}
      </View>
    );
  };

  /**
   * It is used to render fellow seeker user item UIs.
   */
  const renderFelloSeekerItemUIs = (item, index) => {
    return <FellowSeekerItem />;
  };

  /**
   * It is used to render refresh control UIs.
   */
  const renderFelloSeekerList = () => {
    return (
      <View style={styles.fellowSeekerContainer}>
        <Text style={styles.fellowSeekerText}>Fellow Sparkseekers</Text>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 8, marginVertical: 20}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({item, index}) => renderFelloSeekerItemUIs(item, index)}
          // keyExtractor={item => item._id}
        />
      </View>
    );
  };

  /**
   * It is used to render indicator UIs.
   */
  const renderIndicatorUIs = () => {
    return (
      <Indicator
        style={styles.loadingIndicator}
        appearance={IndicatorAppearance.large}
        color={COLORS.app_theme_color}
      />
    );
  };
  /**
   * It is used to render list footer UIs.
   */
  const renderListFooterUIs = () => {
    return (
      <View style={styles.listFooterContainer}>
        <Indicator isAnimating={isLoadMore} />
      </View>
    );
  };

  /**
   * It will call when list reach to end.
   */
  function handleLoadMore() {
    if (
      pagination.current.isLoading === false &&
      pagination.current.isAllLoaded === false &&
      !isLoadMore
    ) {
      getVideoListAPI(false, false, true);
    } else {
      console.log('ALL LOADED');
    }
  }

  /**
   * It is used to get all videos list api.
   */
  async function getVideoListAPI(
    isResetAllData = true,
    isPullToRefresh = false,
    isLoadMore = false,
  ) {
    if ((isResetAllData || isPullToRefresh) && isLoadMore === false) {
      pagination.current = new Pagination(0, 10);
    }

    setIsLoading(isResetAllData && !isPullToRefresh && !isLoadMore);
    setIsLoadMore(isLoadMore);
    GetAllVideosAction(pagination.current, async response => {
      console.log('All videos response', response);
      if (response.status === 200 && response.data) {
        pagination.current.iPageNumber += 1;

        if (isLoadMore && pagination.current.isAllLoaded === false) {
          const promises = response.data.data.map(async obj => {
            let objTemp = {...obj};
            if (!objTemp.muxPlaybackId) {
              const link = await AsyncStorage.getItem(obj.shasum);
              objTemp.videoUrl = link;
              // console.log('objTemp.videoUrl', link);
            }
            return objTemp;
          });

          const newArr = await Promise.all(promises);
          let arr = arrVideos.concat(newArr);
          setArrVideos([...arr]);
          // setTempKey(`${Date().valueOf()}`);
          pagination.current.isLoading = false;
          pagination.current.isAllLoaded = arr.length === response.data.count;
          setIsLoading(false);
          setIsLoadMore(false);
        } else {
          const promises = response.data.data.map(async obj => {
            let objTemp = {...obj};
            if (!objTemp.muxPlaybackId) {
              const link = await AsyncStorage.getItem(obj.shasum);
              // const thumbnail = await AsyncStorage.getItem(
              //   obj.shasum + 'thumbnail',
              // );
              objTemp.videoUrl = link;
              // objTemp.thumbnail = thumbnail;
              // console.log('objTemp.videoUrl', link);
            }
            return objTemp;
          });

          const newArr = await Promise.all(promises);
          setArrVideos([...newArr]);
          pagination.current.isLoading = false;
          pagination.current.isAllLoaded =
            newArr.length === response.data.count;
          setIsLoading(false);
          setIsLoadMore(false);
        }
      } else if (
        response.response.status == 401 &&
        response.response.data &&
        response.response.data.message
      ) {
        RemoveAllStoredDataFromAsyncStorage();
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'splash'}, {name: 'login'}],
          }),
        );
        showToastAlert(response.response.data.message);
      } else if (response.response.data && response.response.data.message) {
        showToastAlert(response.response.data.message);
      } else if (response && response.message) {
        showToastAlert(response.message);
      }
      setIsLoading(false);
      setIsLoadMore(false);
    });
  }

  return (
    <SafeAreaViewContainer style={{backgroundColor: COLORS.app_theme_color}}>
      <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
        {isLoading ? renderIndicatorUIs() : renderFeedListUIs()}
      </View>
    </SafeAreaViewContainer>
  );
}
