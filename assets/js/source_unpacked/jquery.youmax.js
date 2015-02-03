//Youmax 4.0 - http://www.codehandling.com/2015/01/youmax-40-bring-youtube-to-your-users.html
//Buy at http://codecanyon.net

(function ($) {


	//get videos of any playlist using youtube API
	var getPlaylistVideos = function (playlistId,pageToken,$youmaxContainer) {
		//console.log('inside getPlaylistVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		apiPlaylistVideosURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistId+"&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
		
		//console.log('getPlaylistVideos apiPlaylistVideosURL-'+apiPlaylistVideosURL);
		
		$.ajax({
			url: apiPlaylistVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertPlaylistVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//display youtube subscribe button
	renderSubscribeButton = function() {
	
		$.ajaxSetup({
		  cache: true
		});
		
		$.getScript("https://apis.google.com/js/platform.js")
		.done(function( script, textStatus ) {
			//alert( textStatus );
		})
		.fail(function( jqxhr, settings, exception ) {
			//alert( "Triggered ajaxError handler." );
		});
		

		
	},
	
	//initialize youamx - add necessary HTML code
	initYoumax = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		//header
		$youmaxContainer.append('<div id="youmax-header"><div id="youmax-header-wrapper"><div id="youmax-stat-holder"></div></div></div>');
		
		//tabs
		$youmaxContainer.append('<div id="youmax-tabs"></div>');
				
		//select
		$youmaxContainer.append('<div id="youmax-select-box"><select id="youmax-select"></select></div>');
	
		//encloser video
		$youmaxContainer.append('<div id="youmax-encloser"><div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div></div>');
		
		//list
		$youmaxContainer.append('<div id="youmax-video-list-div"><ul id="tiles"></ul></div>');
		
		//load more
		$youmaxContainer.append('<div id="youmax-load-more-div">LOAD MORE</div>');
		$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		
		$youmaxLoadMoreDiv.data('nextpagetoken','');
		
		$youmaxLoadMoreDiv.click(function(){
			loadMorePlaylistVideos($youmaxContainer);
		});
		
		$youmaxContainer.find('#youmax-tabs').on('click','.youmax-tab',function(){
			jQuery.fn.youmax.displayPlaylist(this.id,$youmaxContainer);
		});
		
		$youmaxContainer.find('#youmax-select').change(function(){
			var playlistId = $(this).find(":selected").val();
			jQuery.fn.youmax.displayPlaylist(playlistId,$youmaxContainer);
		});
		
		if(youmax_global_options.alwaysUseDropdown) {
			//console.log('options.alwaysUseDropdown-'+options.alwaysUseDropdown);	
			$youmaxContainer.find('#youmax-select-box').css('display','block');
			//$youmaxContainer.find('#youmax-select-box').show();
			$youmaxContainer.find('#youmax-tabs').hide();
		}
		
	
	},
	
	//load more button functionality
	loadMorePlaylistVideos = function($youmaxContainer) {
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		$youmaxLoadMoreDiv.text('LOADING...');
		$youmaxLoadMoreDiv.addClass('youmax-load-more-div-click');
		var playlistId = $youmaxContainer.find('.youmax-tab.youmax-tab-hover').attr('id');
		var nextPageToken = $youmaxLoadMoreDiv.data('nextpagetoken');
		//console.log('load more clicked : nextPageToken-'+nextPageToken);
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(playlistId.indexOf("search")!=-1) {
				getSearchVideos(playlistId,nextPageToken,$youmaxContainer);
			} else {
				getPlaylistVideos(playlistId,nextPageToken,$youmaxContainer);
			}
			
		} else {
			$youmaxLoadMoreDiv.text('ALL DONE');
		}
	},
	
	//gets channel details using Youtube API
	getChannelDetails = function (channelId,$youmaxContainer) {
		//console.log('inside getChannelDetails');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics%2CcontentDetails&id="+channelId+"&key="+apiKey;
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayChannelHeader(response,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//get channel Id if channel URL is of the form ....../user/Adele
	getChannelId = function (apiUrl,$youmaxContainer) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { getChannelDetails(response.items[0].id,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	//get channel Id if channel URL is of the form ....../user/Adele and add it ot search tab's data
	getChannelIdForSearch = function (apiUrl,$searchTab) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) {
						restrictedChannels = $searchTab.data("restrictToChannels");
						//console.log(restrictedChannels);
						restrictedChannels.push(response.items[0].id);
						$searchTab.data("restrictToChannels",restrictedChannels);
						//console.log(restrictedChannels);
						//console.log($searchTab.attr('id'));
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	//get details of all playlists mentioned in youmax options
	getPlaylistDetails = function (playlistIdArray,$youmaxContainer) {
		//console.log('inside getPlaylistDetails');
		//console.log(playlistIdArray);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		
		apiPlaylistDetailsURL = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id="+playlistIdArray+"&key="+apiKey;
		$.ajax({
			url: apiPlaylistDetailsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayTabs(response,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//get video stats using Youtube API
	getVideoStats = function (videoIdList,$youmaxContainer) {
		//console.log('inside getVideoStats');
		//console.log(videoIdList);
		//showLoader();
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		
		apiVideoStatURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id="+videoIdList+"&key="+apiKey;
		$.ajax({
			url: apiVideoStatURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayVideoStats(response);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	setHeader = function (xhr) {
		if(xhr && xhr.overrideMimeType) {
			xhr.overrideMimeType("application/j-son;charset=UTF-8");
		}
	},
	
	//utility function to displaye view counts
	convertViewCount = function(videoViewCount) {
		videoViewCount = parseInt(videoViewCount);
		if(videoViewCount<1000) {
			
		} else if (videoViewCount<1000000) {
			videoViewCount = Math.round(videoViewCount/1000) + "K";
			
		} else if (videoViewCount<1000000000) {
			videoViewCount = (videoViewCount/1000000).toFixed(1) + "M";
		} else {
			videoViewCount = (videoViewCount/1000000000).toFixed(1) + "B";
		}
		
		return videoViewCount;
		
	},
	
	//utility function to display time
	convertDuration = function(videoDuration) {
		var duration,returnDuration;
		videoDuration = videoDuration.replace('PT','').replace('S','').replace('M',':').replace('H',':');	
		
		//TODO: fix some duration settings
		//console.log('videoDuration-'+videoDuration);
		
		var videoDurationSplit = videoDuration.split(':');
		returnDuration = videoDurationSplit[0];
		for(var i=1; i<videoDurationSplit.length; i++) {
			duration = videoDurationSplit[i];
			////console.log('duration-'+duration);
			if(duration=="") {
				returnDuration+=":00";
			} else {
				duration = parseInt(duration);
				////console.log('duration else -'+duration)
				if(duration<10) {
					returnDuration+=":0"+duration;
				} else {
					returnDuration+=":"+duration;
				}
			}
		}
		if(videoDurationSplit.length==1) {
			returnDuration="0:"+returnDuration;
		}
		return returnDuration;
		
	},
	
	//display channel header
	displayChannelHeader = function(response,$youmaxContainer) {
		//console.log(response);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var channelData = response.items[0];
		
		//alert(videoArray.length);
		channelId = channelData.id;
		channelTitle = channelData.snippet.title;
		channelImage = channelData.snippet.thumbnails.default.url;
		channelSubscribers = channelData.statistics.subscriberCount;
		channelViews = channelData.statistics.viewCount;
		channelBackgroundImage = channelData.brandingSettings.image.bannerImageUrl;
		channelUploadsPlaylistId = channelData.contentDetails.relatedPlaylists.uploads;
		//console.log('channelBackgroundImage-'+channelBackgroundImage);
		
		
		$youmaxContainer.find('#youmax-header').css('background-image',"url("+channelBackgroundImage+")");
		
		$youmaxContainer.find('#youmax-header-wrapper').append('<a href="https://www.youtube.com/channel/'+channelId+'" target="_blank"><div class="youmax-channel-icon"><img src="'+channelImage+'"/></div><div class="youmax-channel-title">'+channelTitle+'</div></a>');
		
		$youmaxContainer.find('#youmax-header-wrapper').append('&nbsp;&nbsp;&nbsp;&nbsp;<div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div>');
		
		$youmaxContainer.find('#youmax-stat-holder').append('<div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelViews)+'</span><br/> VIDEO VIEWS </div><div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelSubscribers)+'</span><br/>SUBSCRIBERS</div>');
		
		$youmaxContainer.find('#youmax-tabs').prepend('<span id="'+channelUploadsPlaylistId+'" class="youmax-tab" >Uploads</span>');
		$youmaxContainer.find('#youmax-select').prepend('<option value="'+channelUploadsPlaylistId+'" class="youmax-option-highlight" >Uploads</span>');
		
		//console.log('selected Tab-'+youmax_global_options.selectedTab);
		if(youmax_global_options.selectedTab.charAt(0)=='u') {
			$('#'+channelUploadsPlaylistId).click();
		}
		
		renderSubscribeButton();
	},
	
	//display tabs for playlists
	displayTabs = function(response,$youmaxContainer) {
		//console.log(response);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var playlistArray = response.items;
		
		//alert(videoArray.length);
		$youmaxTabs = $youmaxContainer.find('#youmax-tabs');
		$youmaxSelect = $youmaxContainer.find('#youmax-select');
		for(var i=0; i<playlistArray.length; i++) {
			playlistId = playlistArray[i].id;
			playlistTitle = playlistArray[i].snippet.title;
			if(playlistTitle.length>youmax_global_options.maxPlaylistNameLength) {
				playlistTitleShort = playlistTitle.substring(0,youmax_global_options.maxPlaylistNameLength) + "..";
			} else {
				playlistTitleShort = playlistTitle;
			}
			
			$youmaxTabs.append('<span id="'+playlistId+'" class="youmax-tab" >'+playlistTitleShort+'</span>');
			$youmaxSelect.append('<option value="'+playlistId+'" >'+playlistTitle+'</option>');
		}
		
		//click the selectedTab
		if(youmax_global_options.selectedTab.charAt(0)=='p') {
			playlistSelect = (youmax_global_options.selectedTab.charAt(1)) - 1;
			if(null!=playlistArray[playlistSelect]) {
				$('#'+playlistArray[playlistSelect].id).click();
			}
		}
	},
	
	//display video statistics
	displayVideoStats = function(response) {
		//console.log(response);
		
		var videoArray = response.items;
		
		//alert(videoArray.length);

		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].id;
			videoViewCount = videoArray[i].statistics.viewCount;
			videoViewCount = convertViewCount(videoViewCount);
			videoDuration = videoArray[i].contentDetails.duration;
			videoDuration = convertDuration(videoDuration);
			videoDefinition = videoArray[i].contentDetails.definition.toUpperCase();
			
			$('#'+videoId).find('.youmax-video-list-views').prepend(videoViewCount+' views | ');
			$('#'+videoId).append('<div class="youmax-duration">'+videoDuration+'</div>');
			$('#'+videoId).append('<div class="youmax-definition">'+videoDefinition+'</div>');
			
		}
	},
	
	//insert HTML for video thumbnails into youmax grid
	insertPlaylistVideos = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log(response);
		var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			$youmaxContainerList.empty();
		}

		var videoArray = response.items;
		var nextPageToken = response.nextPageToken;
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		
		$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].snippet.resourceId.videoId;
			
			videoTitle = videoArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoIdArray.push(videoId);
			
			//console.log('videoUploaded-'+videoUploaded);
			
			$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views">'+getDateDiff(videoUploaded)+' ago</span></p></li>');

		}
		
		createGrid($youmaxContainer);
		
		getVideoStats(videoIdArray,$youmaxContainer);
		
	},

	//insert HTML for video thumbnails into youmax grid
	insertSearchVideos = function(response,$youmaxContainer) {
		//console.log(response);
		var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);

		var videoArray = response.items;
		var nextPageToken = response.nextPageToken;
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		
		$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].id.videoId;

			if($youmaxContainerList.find('#'+videoId).length>0) {
				continue;
			}
			
			videoTitle = videoArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoIdArray.push(videoId);
			
			//console.log('videoUploaded-'+videoUploaded);
			
			$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views">'+getDateDiff(videoUploaded)+' ago</span></p></li>');

		}
		
		createGrid($youmaxContainer);
		
		getVideoStats(videoIdArray,$youmaxContainer);
		
	},

	
	
	//utility function for date time
	getDateDiff = function (timestamp) {
		if(null==timestamp||timestamp==""||timestamp=="undefined")
			return "?";
		//alert(timestamp);
		var splitDate=((timestamp.toString().split('T'))[0]).split('-');
		var d1 = new Date();		
		
		var d1Y = d1.getFullYear();
		var d2Y = parseInt(splitDate[0],10);
		var d1M = d1.getMonth();
		var d2M = parseInt(splitDate[1],10);

		var diffInMonths = (d1M+12*d1Y)-(d2M+12*d2Y);
		/*alert(d1Y);
		alert(d2Y);
		alert(d1M);
		alert(d2M);
		alert(diffInMonths);
		*/
		if(diffInMonths<=1)
			return "1 month";
		else if(diffInMonths<12)
			return  diffInMonths+" months";
		
		var diffInYears = Math.floor(diffInMonths/12);
		
		if(diffInYears<=1)
			return "1 year";
		else if(diffInYears<12)
			return  diffInYears+" years";

	},
	
	//create grid layout using Wookmark plugin
	createGrid = function($youmaxContainer) {
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');	
		var $youmaxContainerList = $youmaxContainer.find('ul');
		$youmaxContainerList.imagesLoaded(function() {			
		
			var options = {
			  autoResize: true, // This will auto-update the layout when the browser window is resized.
			  container: $youmaxContainer.find('#youmax-video-list-div'), // Optional, used for some extra CSS styling
			  offset: youmax_global_options.innerOffset, // Optional, the distance between grid items
			  itemWidth: youmax_global_options.minItemWidth, // Optional, the width of a grid item
			  flexibleWidth : youmax_global_options.maxItemWidth,
			  outerOffset: youmax_global_options.outerOffset
			};

			
			var handler = $youmaxContainerList.find('li');
			
			// Call the layout function.
			handler.wookmark(options);
			
			//TODO: deregister earlier popups : not needed
			registerPopup($youmaxContainer);
			resetLoadMoreButton($youmaxContainer);
			
		});
	},
	
	resetLoadMoreButton = function($youmaxContainer) {
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		$youmaxLoadMoreDiv.removeClass('youmax-load-more-div-click');
		$youmaxLoadMoreDiv.text('LOAD MORE');
	},
	
	//register video popup on video thumbnails
	registerPopup = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			//display video in popup
			$youmaxContainer.find('#youmax-video-list-div li').magnificPopup({
				type:'iframe',
				iframe:{
				patterns: {
						youtube: {
							src: 'http://www.youtube.com/embed/%id%?rel=0&autoplay=1' // URL that will be set as a source for iframe. 
						}
					}
				},
				preloader:false,
				showCloseBtn: true, 
				closeBtnInside: true, 
				closeOnContentClick: false, 
				closeOnBgClick: true, 
				enableEscapeKey: true, 
				modal: false, 
				alignTop: false, 
				removalDelay: 100, 
				mainClass: ' ' 
			});		
		} else {
			//display inline video
			//http://www.youtube.com/embed/%id%?rel=0&autoplay=1
			//var $youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
			$youmaxContainer.find('#youmax-video-list-div li').click(function(){
				//console.log($youmaxEncloserIframe);
				
				$youmaxEncloserIframe = $(this).parent().parent().prev().find('#youmax-encloser-video');
				$youmaxEncloserIframe.attr("src","");
				$youmaxEncloserIframe.parents("#youmax-encloser").show();
				$('html, body').animate({scrollTop: $youmaxEncloserIframe.offset().top - 50},'slow');
				//$youmaxEncloserIframe.show();
				$youmaxEncloserIframe.attr("src","http://www.youtube.com/embed/"+this.id+"?rel=0&autoplay=1");
				
				//youmax-encloser
			
			});
		}
	
	},
	
	//display tabs for search criteria
	displaySearchTab = function(name,restrictToChannels,relatedTo,searchQuery,searchOrder,eventType,count,apiKey,$youmaxContainer) {
		
		searchTabId = 'search'+count+'_'+$.now();
		$youmaxContainer.find('#youmax-tabs').append('<span id="'+searchTabId+'" class="youmax-tab" >'+name+'</span>');
		$youmaxContainer.find('#youmax-select').append('<option value="'+searchTabId+'" >'+name+'</option>');
		
		$searchTab = $youmaxContainer.find('#'+searchTabId);
	
		//restrictToChannels
		$searchTab.data('restrictToChannels',[]);
		var restrictedChannelArray = restrictToChannels.split(',');
		for(var i=0; i<restrictedChannelArray.length; i++) {
			if(restrictedChannelArray[i]!=null) {
				s=restrictedChannelArray[i].indexOf("/user/");
				////console.log('s-'+s);
				if(s!=-1) {
					userId = restrictedChannelArray[i].substring(s+6);
					//console.log('userId-'+userId);
					apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+apiKey;
					getChannelIdForSearch(apiUrl,$searchTab);
				} else {
					s=restrictedChannelArray[i].indexOf("/channel/");
					if(s!=-1) {
						channelId = restrictedChannelArray[i].substring(s+9);
						restrictedChannels = $searchTab.data("restrictToChannels");
						//console.log(restrictedChannels);
						restrictedChannels.push(channelId);
						$searchTab.data("restrictToChannels",restrictedChannels);
					} else {
						$searchTab.data("restrictToChannels","");
					}
				}
			}
		}
		
		//relatedTo
		s=relatedTo.indexOf("/watch?v=");
		if(s!=-1) {
			videoId = relatedTo.substring(s+9);
			//console.log('videoId-'+videoId);
			$searchTab.data("relatedTo",videoId);
		} else {
			$searchTab.data("relatedTo","");
		}
		
		//searchQuery
		if(searchQuery!=null) {
			$searchTab.data("searchQuery",searchQuery);
		} else {
			$searchTab.data("searchQuery","");
		}
		
		//searchOrder
		$searchTab.data("searchOrder",searchOrder);
		
		//eventType
		if(eventType!=null) {
			$searchTab.data("eventType",eventType);
		} else {
			$searchTab.data("eventType","");
		}
		
		//click the selectedTab
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.selectedTab.charAt(0)=='s') {
			searchSelect = (youmax_global_options.selectedTab.charAt(1));
			//console.log('searchSelect-'+searchSelect);
			//console.log('count-'+count);
			if(count.toString()==searchSelect) {
				$('#'+searchTabId).click();
			}
		}
		
	},
	
	//get search videos when a tab is clicked
	getSearchVideos = function(searchTabId, pageToken, $youmaxContainer) {
	
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		if(!loadMoreFlag) {
			$youmaxContainer.find('ul').empty();
		}	
	
		$searchTab = $('#'+searchTabId);
		restrictedChannels = $searchTab.data("restrictToChannels");
		relatedTo = $searchTab.data("relatedTo");
		searchQuery = $searchTab.data("searchQuery");
		searchOrder = $searchTab.data("searchOrder");
		eventType = $searchTab.data("eventType");
		
		var apiURLArray = [];
		
		var searchQueryString = "";
		if(null!=searchQuery && searchQuery!="") {
		searchQuery=searchQuery.replace(/ /g,"%20");
		searchQueryString = "&q="+(searchQuery);
		}
		
		var relatedToString = "";
		if(null!=relatedTo && relatedTo!="") {
		relatedToString = "&relatedToVideoId="+relatedTo;
		}
		
		var eventTypeString = "";
		if(null!=eventType && eventType!="") {
		eventTypeString = "&eventType="+eventType;
		}
		
		var searchOrderString = "";
		if(null!=searchOrder && searchOrder!="") {
		searchOrderString = "&order="+searchOrder;
		}
		
		var restrictedChannelsString = "";
		if(null!=restrictedChannels && restrictedChannels.length>0) {
		restrictedChannelsString = "&channelId="+restrictedChannels[0];
		}
		
		if(restrictedChannels.length>0) {
			maxResults = maxResults/restrictedChannels.length;
		}

		
		apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+restrictedChannelsString+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);

		
		for(var l=1; l<restrictedChannels.length; l++) {
			apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+"&channelId="+restrictedChannels[l]+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);
		}

		
		
		//console.log('restrictedChannels-'+restrictedChannels);
		//console.log('relatedTo-'+relatedTo);
		//console.log('searchQuery-'+searchQuery);
		//console.log('searchOrder-'+searchOrder);
		
		
		for(var l=0; l<apiURLArray.length; l++) {
			
			/*if(!loadMoreFlag && l>0) {
				loadMoreFlag=true;
			}*/
			
			apiPlaylistVideosURL = apiURLArray[l];
			
			//console.log('getSearchVideos apiPlaylistVideosURL-'+apiPlaylistVideosURL);
			//console.log('loadMoreFlag -'+loadMoreFlag);
			
			$.ajax({
				url: apiPlaylistVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		}
	},
	
	//display loading.. text
	showLoader = function($youmaxContainer) {
		$youmaxContainer.find('#youmax-video-list-div>ul').empty();
		$youmaxContainer.find('#youmax-video').hide();
		$youmaxContainer.find('#youmax-video').attr('src','');
		$youmaxContainer.find('#youmax-video-list-div>ul').append('<div style="text-align:center; height:200px; font:14px Calibri;"><br><br><br><br><br><br>loading...</div>');
	};



	//youmax plugin definition
    $.fn.youmax = function(options) {
		
		var youmax_global_options = {};
		var $youmaxContainer = this;
		var searchDefaults = {name:'Search',restrictToChannels:'',relatedTo:'',searchQuery:'',searchOrder:'',eventType:''};
		//console.log($youmaxContainer.attr('id'));
		
		//Get CSS for Skins
		//options.skin = options.skin||"";
		//console.log('options.skin-'+options.skin);
		if(options.skin=="white" || options.skin=="grey") {
			if (document.createStyleSheet){
                document.createStyleSheet("./css/youmax_"+options.skin+".min.css");
            } else {
                $("head").append("<link rel='stylesheet' href='./css/youmax_"+options.skin+".min.css' type='text/css' />");
            }
		} else {
			//don't load any styles
			//user will load them manually
		}
		
		//set local options
		youmax_global_options.apiKey = options.apiKey;
		youmax_global_options.maxResults = options.maxResults||30;
		youmax_global_options.innerOffset = options.innerOffset||40;
		youmax_global_options.outerOffset = options.outerOffset||40;
		youmax_global_options.minItemWidth = options.minItemWidth||250;
		youmax_global_options.maxItemWidth = options.maxItemWidth||350;
		
		if(options.displayVideo == 'inline') {
			youmax_global_options.displayVideo = 'inline';
		} else {
			youmax_global_options.displayVideo = 'popup';
		}
		
		//TODO
		youmax_global_options.aspectRatio = 360/640;		
		
		//console.log('options.selectedTab-'+options.selectedTab);
		youmax_global_options.selectedTab = options.selectedTab||"u";
		youmax_global_options.alwaysUseDropdown = options.alwaysUseDropdown;
		//console.log('options.alwaysUseDropdown-'+options.alwaysUseDropdown);		
		youmax_global_options.maxPlaylistNameLength = 22;
		
		$youmaxContainer.data('youmax_global_options',youmax_global_options);
		
		options.maxContainerWidth = options.maxContainerWidth||1000;
		$youmaxContainer.css('max-width',(options.maxContainerWidth)+'px');
		
		//adding media queries manually if maxContainerWidth is very low (widget mode)
		if(options.maxContainerWidth<800) {
			$("body").append("<style>#youmax-stat-holder {display:none;}.youmax-subscribe {left:initial;}#youmax-select-box{display:block;}#youmax-tabs {display:none;}</style>");
		}

		if(options.maxContainerWidth<500) {
			$("body").append("<style>#youmax-stat-holder {display:none;}.youmax-subscribe {display:none;}.youmax-tab {width: 42%;text-align: center;}</style>");
		}

		if(options.maxContainerWidth<300) {
			$("body").append("<style>.youmax-tab {width: 90%;text-align: center;}</style>");
		}

		
		
		
		//console.log(options);
		
		initYoumax($youmaxContainer);

		
		////console.log($youmaxContainer);
		////console.log($youmaxContainer.length);
		////console.log($youmaxContainer.attr('id'));
		////console.log(options.playList1);
		
		var s,playlistId,channelId,userId,apiUrl;
		var playlistIdArray = [];
		
		//Get Channel header and details 
		if(options.channel!=null) {
			s=options.channel.indexOf("/user/");
			////console.log('s-'+s);
			if(s!=-1) {
				userId = options.channel.substring(s+6);
				//console.log('userId-'+userId);
				apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+options.apiKey;
				getChannelId(apiUrl,$youmaxContainer);
			} else {
				s=options.channel.indexOf("/channel/");
				if(s!=-1) {
					channelId = options.channel.substring(s+9);
					//console.log('channelId-'+channelId);
					getChannelDetails(channelId,$youmaxContainer);
				} else {
					alert("Could Not Find Channel..");
				}
			}
		}
		
		//get playlist details
		if($.isArray(options.playList)) {
			for(var i=0; i<options.playList.length; i++) {
				s=options.playList[i].indexOf("list=");
				//console.log('s-'+s);
				if(s!=-1) {
					playlistId = options.playList[i].substring(s+5);
					//console.log('playlistId-'+playlistId);
					playlistIdArray.push(playlistId);
				} else {
					//alert("Could Not List Videos..");
				}
			}
		}
		
		//get all playlist details
		getPlaylistDetails(playlistIdArray,$youmaxContainer);
		
		//display search tabs
		if($.isArray(options.searchTab)) {
			for(var i=0; i<options.searchTab.length; i++) {
				searchOptions=options.searchTab[i];
				//console.log(searchOptions);
				if(null!=searchOptions) {
					displaySearchTab(searchOptions.name||searchDefaults.name,
									searchOptions.restrictToChannels||searchDefaults.restrictToChannels,
									searchOptions.relatedTo||searchDefaults.relatedTo,
									searchOptions.searchQuery||searchDefaults.searchQuery,
									searchOptions.searchOrder||searchDefaults.searchOrder,
									searchOptions.eventType||searchDefaults.eventType,
									(i+1),
									youmax_global_options.apiKey,
									$youmaxContainer);
				
				} else {
					//alert("Could Not List Videos..");
				}
			}
		}
		
		//return this for chaining
		return this;
 
    };
	


	//displays playlist videos when a tab is clicked
	$.fn.youmax.displayPlaylist = function(playlistId, $youmaxContainer) {
	
		$youmaxContainer.find("#youmax-encloser").hide();
		$youmaxContainer.find("#youmax-encloser-video").attr("src","");
		showLoader($youmaxContainer);
		
		if(playlistId.indexOf("search")!=-1) {
			getSearchVideos(playlistId,null,$youmaxContainer);
		} else {
			getPlaylistVideos(playlistId,null,$youmaxContainer);			
		}
		
		$youmaxContainer.find('.youmax-tab').removeClass('youmax-tab-hover');	
		$('#'+playlistId).addClass('youmax-tab-hover');
		$youmaxContainer.find('#youmax-select').val(playlistId);

	};
	
 
}( jQuery ));
