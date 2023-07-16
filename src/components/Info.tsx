import React from 'react';
// import { Collapse } from 'react-collapse';
import styles from '../styles/Home.module.css';
// import { fetchAPI } from "../lib/api";
// import StrapiImage from '../Components/StrapiImage'

// import { useEffect, useState } from 'react'

export default function Info(/* { isOpen, about } */) {

	//console.log("Info", about.Description)

	/*const [info, setInfo] = useState({})

	useEffect(async () => {
		const about = await fetchAPI("/about");

		setInfo({description: about.Description, profileImage: about.ProfileImage})

	}, [])*/


	return (
		// <Collapse isOpened={isOpen}>
		<div>
			<div class={styles.info}>
				<div id={styles.profileImage}>
					{/* <StrapiImage image={about?.ProfileImage?.formats?.medium} imgClass="galleryImg" /> */}
					{/* <StrapiImage image={info.profileImage?.formats?.medium} imgClass="galleryImg" /> */}
					{/* <img src="http://localhost:1337/uploads/medium_info_78b47ba2f7.jpg" className={styles.profileImg} /> */}
				</div>
				<p>
					{/* {info.description} */}
					{/* {about.Description} */}
				</p>
			</div>
			{/* </Collapse> */}
			</div>
	)
}