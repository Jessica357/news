import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, FlatList} from 'react-native';
import HomeScene from './home/scenes/HomeScene';

export default class App extends Component<Props, State> {
  render() {
    return <HomeScene />;
  }
}
