import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = {};

type State = {
  API_KEY: string;
  sources: Array<string>;
  selectedSource: string;
};

export default class HomeScene extends Component<Props, State> {
  state = {
    API_KEY: 'e2ef19f2bc834fe1aeb34a5d1cccd00e',
    sources: [],
    selectedSource: '',
  };

  async _fetch() {
    let url = `https://newsapi.org/v2/sources?apiKey=${this.state.API_KEY}`;
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application-json',
      },
    });
    let data = await res.json();

    let sources = [];
    for (let item of data.sources) {
      sources.push(item.name);
    }
    this.setState({sources});
    // console.log(sources);
  }

  // _onPressItem = (id: string) => {
  //   this.setState((state) => {
  //     const selected = new Map(state.selected);
  //     selected.set(id, !selected.get(id));
  //     return {selected};
  //   });
  // };

  // _renderItem = ({item}) => (
  //   <SourcesList
  //     name={item.name}
  //     onPressItem={this._onPressItem}
  //     selected={!!this.state.selected.get(item.id)}
  //     title={item.title}
  //   />
  // );

  componentDidMount() {
    this._fetch();
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback>
        <View style={{backgroundColor: 'white'}}>
          <Text>{item}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _keyExtractor = (_, index) => {
    return index.toString();
  };

  render() {
    let {sources} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.sourceText}>Source List</Text>
        <FlatList
          data={sources}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006600',
    paddingTop: 70,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#ffffff',
  //   paddingTop: 100,
  //   alignItems: 'center',
  //   // justifyContent: 'center',
  // },
  sourceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
