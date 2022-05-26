/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "../axios";
import "../styles/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import requests from "../requests";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
		}

		fetchData();
	}, [fetchUrl]);

	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.name || movie?.title || "")
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log(error));
		}
	};

	const options = {
		// 	height: "390",
		// 	width: "98%",
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<div className="row">
			<h3>{title}</h3>
			<div className="row_posters">
				{movies.map((movie) => {
					if (movie.backdrop_path == null) {
						return null;
					}

					return (
						<img
							onClick={() => handleClick(movie)}
							className={`row_poster ${isLargeRow ? "row_poster_large" : null}`}
							key={movie.id}
							src={`${base_url}${
								isLargeRow ? movie.poster_path : movie.backdrop_path
							}`}
							alt={movie.name}
						/>
					);
				})}
			</div>
			{trailerUrl && (
				<Youtube className="YoutubeVid" videoId={trailerUrl} opts={options} />
			)}
		</div>
	);
}

export default Row;
