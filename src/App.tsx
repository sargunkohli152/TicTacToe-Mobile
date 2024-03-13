import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icons from './components/Icons';

const App = (): React.JSX.Element => {

  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadgame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  }

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if(gameWinner){
      return Toast.show({
        type: 'success',
        text1: gameWinner,
      });
    }

    if(gameState[itemNumber] === 'empty'){
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    }
    else{
      return Toast.show({
        type: 'error',
        text1: 'Position is already filled',
        text2: 'Make your move at some other empty location'
      })
    }

    checkIsWinner();
  }

  console.log(useColorScheme() === 'dark');

  return (
    <>
    <StatusBar/>
      <View style={styles.appContainer}>
        {gameWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{gameWinner}</Text>
          </View>
        ) : 
        (
          <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
            <Text style={styles.gameTurnTxt}>Player {isCross ? 'X' : 'O'}'s Turn</Text>
          </View>
        )}

        <FlatList 
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => onChangeItem(index)}
          >
            <Icons name={item}/>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity
          style={styles.gameBtn}
          onPress={reloadgame}
          >
            <Text style={styles.gameBtnText}>{gameWinner ? 'Start New Game' : 'Reload The Game'}</Text>
          </TouchableOpacity>
        }
        />   
      <Toast />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#292828',
    height: 20000
  },
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#b09321',
  },
  playerO: {
    backgroundColor: '#2b9458',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 0.5,
    borderColor: '#FFFFFF',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#FFFFFF',
    marginTop: 20
  },
  gameBtnText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
});

export default App;
