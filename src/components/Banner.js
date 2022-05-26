import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../requests";
import "../styles/Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			setMovie(
				request.data.results[
					Math.round(Math.random() * request.data.results.length - 1)
				]
			);
		}

		fetchData();
	}, []);

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<div
			className="banner"
			style={{
				backgroundImage: movie
					? `url("${base_url}${movie?.backdrop_path}")`
					: `url(${"../assets/thumbnail.png"})`,
				backgroundPosition: "center center",
				backgroundSize: "cover",
			}}
		>
			<div className="banner_content">
				<h1 className="banner_title">
					{movie?.name || movie?.title || movie?.original_name}
				</h1>

				<div className="banner_buttons">
					<button className="banner_button">Play</button>
					<button className="banner_button">My List</button>
				</div>

				<p className="banner_description">{truncate(movie?.overview, 151)}</p>
			</div>
			<div className="banner--fadeBottom"></div>
		</div>
	);
}

export default Banner;
