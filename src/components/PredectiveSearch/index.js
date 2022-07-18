import React from 'react'
import { View, Text } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';

export default function PredictiveSearch(props) {

    // const { query } = this.state;
    // const data = filterData(query);
    const {data, query, onChangeText} = props;

    return (
        <Autocomplete
            data={data}
            value={query}
            onChangeText={onChangeText}
            flatListProps={{
                keyExtractor: (item) => item.id,
                renderItem: ({ item }) => <Text>{item.name}</Text>,
            }}
        />
    );

}
