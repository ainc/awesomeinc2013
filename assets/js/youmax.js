$('#youmax').youmax({
			
			apiKey:'AIzaSyBSU5dYJrvNdaC5J9wo36c2xkXWP1kT_WA',

			channel:'https://www.youtube.com/user/AincTelevision',
			playList: [
				'https://www.youtube.com/playlist?list=PL_YvoQ-KM3YH08eoB7aRjeWUyFR6yYMjC',
				'https://www.youtube.com/playlist?list=PL_YvoQ-KM3YEGsbq_L-2AShgBIEuqRfQz',
			// ],
			
			// searchTab:[ 
			// {
			// 	name:'MySearch', //Name of the tab
			// 	searchQuery:'awesome academy', //Search query
			// 	searchOrder:'viewCount' //Order descending by date|rating|relevance|title|viewCount
			// }
			],

			
			selectedTab: 'u', //u - for uploads, p1 - for 1st playlist, p2 - for 2nd playlist .... s1 for 1st SearchTab, s2 for 2ns SearchTab .....
			displayVideo: 'inline', //popup|inline
			skin: 'white', //white|grey|none
			
		});