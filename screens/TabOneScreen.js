import { ActivityIndicator, FlatList, StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import {  useState } from "react";
import axios from 'axios'


const logErrorResponse = (error) => {
  // Handle response error here
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response error data:', error.response.data);
    console.error('Response error status:', error.response.status);
    console.error('Response error headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request error:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);
  }
  console.error('Error config:', error.config);
};

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setData(response.data);

      } catch (error) {
        console.error(error);
        logErrorResponse(error);
      } finally {
        setLoading(false);
      }
    };


  return (
    <View style={styles.container}>
      <Button title="Get Posts" onPress={getPosts} disabled={isLoading} />
       {isLoading ? (
        <ActivityIndicator />
      ) : (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index}
            renderItem={({item}) => (
              <Text key={item.id}>
                {item.title}
              </Text>
            )}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
