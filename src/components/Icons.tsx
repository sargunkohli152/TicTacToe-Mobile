import React from 'react'
import type { PropsWithChildren } from 'react'
import { View, StyleSheet } from 'react-native';

type IconsProps = PropsWithChildren<{
    name: string;
}>


const Icons = ({name}: IconsProps) => {
    switch(name){
        case 'circle':
            return <View style={styles.circle} />
    
        case 'cross':
            return (
                <View style={styles.crossContainer}>
                    <View style={styles.horizontalLine} />
                    <View style={styles.verticalLine} />
                </View>
            )
        
        default:
            return <View style={styles.square} />
      }
}

const styles = StyleSheet.create({
    square: {
        width: 38,
        height: 38,
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    },
    circle: {
        width: 38, 
        height: 38,
        borderRadius: 50, 
        borderColor: '#38CC77',
        borderWidth: 2
    },
    crossContainer: {
        width: 38, 
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalLine: {
        position: 'absolute',
        backgroundColor: '#F7CD2E', 
        height: 4,
        width: '100%',
    },
    verticalLine: {
        position: 'absolute',
        backgroundColor: '#F7CD2E', 
        width: 4,
        height: '100%',
    },
})

export default Icons
