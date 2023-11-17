import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import {globalStyles} from "../global_styles";

type Props = {
    id: number
    title: string
    changeTitleCB: (taskId: number, title: string) => void
}

export const Input = ({title,changeTitleCB, id}: Props) => {
    
    let [value, setValue] = useState<string>(title)

    const changeTitle = (title: string) => {
        setValue(title)
    }
    
    return (
        <View style={{flexDirection: 'row'}}>
            <TextInput style={[globalStyles.border]}
                       value={value}
                       onChangeText={(title) => changeTitle(title)}
                       autoFocus
            />
            <Button title={'+'} onPress={() => changeTitleCB(id, value)}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '90%',
        backgroundColor: '#7f5af0',
        fontSize: 18,
        padding: 10,
    },
})


