import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import NewScreen from "../../screens/news";
import HuesReactNativeModule from 'hues-react-native-module';

const Stack = createStackNavigator();

function StackNavigator(token: any) {
    const navigation = useNavigation<any>();

    const handlerBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // Alert.alert('Không có màn hình trước đó,quay lại Hue-S');
            // HuesReactNativeModule.goBack();
        }
    }

    const renderHeaderLeft = () => {
        return (
            <Ionicons name='chevron-back' size={32} onPress={handlerBack} style={{ marginHorizontal: 5 }} />
        );
    };

    return (
        <Stack.Navigator
            initialRouteName='new'
            screenOptions={{
                headerLeft: renderHeaderLeft
            }}
        >
            <Stack.Screen
                name="new"
                component={NewScreen}
                options={{
                    title: 'Thông tin khảo sát',
                    headerShown: true,
                }}
                initialParams={{ token: token }}
            />
        </Stack.Navigator>
    )

}

export default StackNavigator;
