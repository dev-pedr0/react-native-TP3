import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from "react-native";
import MovieItem from "../components/MovieItem";
import { getMovies, Movie } from "../services/api";


interface MoviesResponse {
  results: Movie[];
}

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);

    useEffect(() => {
        loadMovies(1, search);
    }, [search]);

    const loadMovies = async (pageNumber: number = 1, query: string = "") => {
        if (pageNumber === 1) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const response: MoviesResponse = await getMovies(pageNumber, query);

            if (pageNumber === 1) {
                setMovies(response.results);
            } else {
                setMovies((prev) => [...prev, ...response.results]);
            }
            setPage(pageNumber);
        } catch (error) {
            console.error("Erro ao carregar filmes:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMore = () => {
        if (!loadingMore) {
            loadMovies(page + 1, search);
        } 
    }

    return (
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#1e1e1e', '#121212']}
                    style={styles.background}
                    />

                <TextInput
                    placeholder="Buscar filmes..." 
                    value={search}
                    onChangeText={setSearch}
                    style={styles.input}
                    placeholderTextColor="white"
                />

                {loading ? (
                    <ActivityIndicator size="large"/>
                ) : (
                    <FlatList
                        data={movies}
                        renderItem={({ item }) => <MovieItem movie={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={
                            loadingMore ? <ActivityIndicator size="small" /> : null
                        }
                    />
                )}
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        gap: 20,
    },
     background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
    },
    input: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingLeft: 10,
        marginTop: 10,
        fontSize: 16,
        color: "white",
    }
});