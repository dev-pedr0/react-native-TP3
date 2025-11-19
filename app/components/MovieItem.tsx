import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Movie } from "../services/api";

interface MovieItemProps {
  movie: Movie;
}

export default function MovieItem({ movie }: MovieItemProps) {
    const year = movie.release_date ? movie.release_date.split("-")[0] : "";

    return (
        <View style={styles.movieContainer}>
            {movie.poster_path && (
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                    }}
                    style={styles.poster}
                />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {year
                        ? `${movie.title} || ${year}`
                        : movie.title
                    }
                </Text>
                <Text style={styles.vote}>Votos: {movie.vote_average}</Text>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    movieContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    poster: {
        width: 200,
        height: 300,
        borderRadius: 8
    },
    textContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
    },
    vote: {
        color: "#dfbd00ff",
        fontWeight: "bold",
        fontSize: 20
    }
});