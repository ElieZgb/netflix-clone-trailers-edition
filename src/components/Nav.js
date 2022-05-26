import React, { useEffect, useState } from "react";
import NetflixLogo from "../assets/netflix-logo.png";
import NetflixProfile from "../assets/netflix-profile.png";
import "../styles/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";

function Nav() {
	const [showNav, setShowNav] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 0) {
				setShowNav(true);
			} else {
				setShowNav(false);
			}
		});
	}, []);

	return (
		<div className={`nav ${showNav ? "nav_black" : null}`}>
			<img className="nav_logo" src={NetflixLogo} alt="Netflix Logo" />
			<div className="nav_links">
				<ul>
					<li>Home</li>
					<li>TV Shows</li>
					<li>Movies</li>
					<li>New & Popular</li>
					<li>My List</li>
				</ul>
			</div>
			<div className="nav_buttons">
				<FontAwesomeIcon icon={faSearch} className="fontawesome_icon" />
				<FontAwesomeIcon icon={faBell} className="fontawesome_icon" />
				<div className="nav_profile">
					<img src={NetflixProfile} alt="Netflix Profile" />
				</div>
			</div>
		</div>
	);
}

export default Nav;
