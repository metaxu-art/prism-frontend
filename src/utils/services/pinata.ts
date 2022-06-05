import axios from 'axios';
import config from '_utils/config';

export const uploadToPinata = async (file: File) => {
	// initialize the form data
	const formData = new FormData();

	// append the file form data to
	formData.append('file', file);

	// call the keys from .env

	// the endpoint needed to upload the file
	const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

	let response;
	try {
		response = await axios.post(url, formData, {
			maxContentLength: 100000000,
			headers: {
				'Content-Type': `multipart/form-data;boundary=${(formData as any)._boundary}`,
				pinata_api_key: config.pinata.apiKey,
				pinata_secret_api_key: config.pinata.secretKey,
			},
		});
		// console.log('response', response);
	} catch (e) {
		console.error(`failed uploading a file with the filename ${file.name} to ipfs. ${e}`);
	}
	return response?.data;
};
