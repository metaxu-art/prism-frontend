import type { NextPage } from 'next';
import { useEffect } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';

const Home: NextPage = () => {
	useEffect(() => {
		fetch('/hello').then((data) => {
			console.log('data', data);
		});
	}, []);
	return <div className="bg-red-200">tailwind is working</div>;
};

export default Home;
