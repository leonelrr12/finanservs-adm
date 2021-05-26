import * as React from "react"
import axios from "axios"

export const useDownloadFile = (url) => {
	const [downloadUrl, setDownloadUrl] = React.useState(null)
	const config = {
		url,
		method: "GET",
		responseType: "blob"
	}
	React.useEffect(() => {
		(async () => {
			try {
				const {data} = await axios.request(config)
				const url = URL.createObjectURL(new Blob([data]))
				setDownloadUrl(url)
			}catch(e) {
				console.log(e)
			}
		})();
	},[])
	return downloadUrl
}