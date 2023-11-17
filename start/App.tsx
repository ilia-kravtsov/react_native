import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import Checkbox from 'expo-checkbox';
import {ReactElement, ReactNode, useState} from "react";
import {Input} from "./Input/Input";
import {globalStyles} from "./global_styles";

export default function App() {

    const [value, setValue] = useState<string>('What to learn')
    let [show, setShow] = useState<number>(0)
    const [tasks, setTasks] = useState<{ id: number, title: string, isDone: boolean }[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'REACT', isDone: true},
        {id: 5, title: 'REACT-NATIVE', isDone: false},
    ])

    const addTask = () => {
      const newTask = {id: tasks.length + 1, title: value, isDone: false}
      setTasks([newTask, ...tasks])
      setValue('')
    }

    const changeTaskStatus = (taskId: number, event: boolean) => {
      setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: event} : task))
    }

    const deleteTaskHandler = (taskId: number) => {
      setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeTitleCB = (taskId: number, title: string) => {
      setTasks(tasks.map(task => task.id === taskId ? {...task, title} : task))
      setShow(0)
    }

    return (
        <View style={styles.container}>
            <HideKeyboard>
                <View style={[{width: '80%', alignItems: 'center', paddingVertical: 30}, globalStyles.border]}>
                    <TextInput style={[globalStyles.border, styles.input]} value={value} onChangeText={setValue}/>
                </View>
            </HideKeyboard>
            <View style={[globalStyles.border, {borderColor: 'white'}]}>
                <Button title={'Add Task'} onPress={addTask}/>
            </View>
            <View style={{width: '60%'}}>
                {tasks.map((task) => {
                    return <View key={task.id} style={[globalStyles.border, styles.boxTasks]}>
                            <Checkbox value={task.isDone} onValueChange={(e) => changeTaskStatus(task.id, e)}/>
                      {show === task.id
                          ? <Input title={task.title} changeTitleCB={changeTitleCB} id={task.id}/>
                          : <Text onPress={() => setShow(task.id)}>{task.title}</Text>}
                        <Button title={'Delete'} onPress={() => deleteTaskHandler(task.id)}/>
                    </View>
                })}
            </View>
        </View>
    );
}

const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={[globalStyles.border]}>
        {children}
    </TouchableWithoutFeedback>
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16161a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        backgroundColor: '#7f5af0',
        fontSize: 18,
        padding: 10,
    },
    boxTasks: {
        flexDirection: 'row',
        backgroundColor: '#7f5af0',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 20,
        marginVertical: 3
    }
});



// <TextInput style={[globalStyles.border,styles.input, {backgroundColor: 'whitesmoke'}]} value={value} onChangeText={setValue}/>