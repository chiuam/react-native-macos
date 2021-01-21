/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict'; // TODO(OSS Candidate ISS#2710739)

const React = require('react');
const ReactNative = require('react-native');
import {Platform} from 'react-native';
const {Button, Text, View} = ReactNative;

import type {KeyEvent} from 'react-native/Libraries/Types/CoreEventTypes';

type State = {
  eventStream: string,
  characters: string,
};

class KeyEventExample extends React.Component<{}, State> {
  state: State = {
    eventStream: '',
    characters: '',
  };

  onKeyDownEvent: (e: KeyEvent) => void = (e: KeyEvent) => {
    console.log('received view key down event\n', e.nativeEvent.key);
    this.setState({characters: e.nativeEvent.key});
    this.setState(prevState => ({
      eventStream:
        prevState.eventStream + '\nKey Down: ' + prevState.characters,
    }));
  };

  onKeyUpEvent: (e: KeyEvent) => void = (e: KeyEvent) => {
    console.log('received key up event\n', e.nativeEvent.key);
    this.setState({characters: e.nativeEvent.key});
    this.setState(prevState => ({
      eventStream: prevState.eventStream + '\nKey Up: ' + prevState.characters,
    }));
  };

  render() {
    return (
      <View>
        <Text>Key events are called when a component detects a key press.</Text>
        <View>
          {Platform.OS === 'macos' ? (
            <View
              acceptsKeyboardFocus={true}
              enableFocusRing={true}
              validKeysDown={['a', 'b', 'x', 'rightArrow']}
              onKeyDown={this.onKeyDownEvent}
              validKeysUp={['c', 'd', 'leftArrow']}
              onKeyUp={this.onKeyUpEvent}>
              <Button
                title={'Test button'}
                validKeysDown={['g', 'h', 'i', 'x']}
                onKeyDown={this.onKeyDownEvent}
                validKeysUp={['j', 'k', 'l']}
                onKeyUp={this.onKeyUpEvent}
                onPress={() => {}}
              />
            </View>
          ) : null}
          <Text>{'Events: ' + this.state.eventStream + '\n\n'}</Text>
        </View>
      </View>
    );
  }
}

exports.title = 'Key Events';
exports.description = 'Examples that show how Key events can be used.';
exports.examples = [
  {
    title: 'KeyEventExample',
    render: function(): React.Element<any> {
      return <KeyEventExample />;
    },
  },
];
