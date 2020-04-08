$(function(){
    let apikey = 'AIzaSyAw2ArwRM2qXCbncvAAL89kNeBvq2-wYBE';
    let vidURL = 'https://www.googleapis.com/youtube/v3/videos';
    
    getPopularVids();
    
    $(".cate-list .item").click(function(){
        let cateId = $(this).data('cate');
        getPopularVids(cateId);
    })
   
    $(".video-list").on('click', 'div.item', function(){
        videoId = $(this).data('id');
        watchVideo(videoId);
    })

    function getPopularVids(cateId=0){
        $(".video-list").empty();
        let popularoptions = {
            part: "snippet,contentDetails,statistics",
            key: apikey,
            chart: 'mostPopular',
            regionCode: 'TW',
            videoCategoryId: cateId,
            maxResults: 6,
        }
        $.getJSON(vidURL,popularoptions,function(data){
            let vidArr = data.items;
            console.log("熱門影片資料",vidArr);
            if(vidArr.length == 0){
                let vidInfo = `
                    <p class="noVids">無該分類熱門影片</p>
                `;
                $(".video-list").append(vidInfo);
                return
            }
            let videoId = vidArr[0].id;
            let vidIframe = `
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
            $("#video").empty().append(vidIframe);
            loadVids(vidArr);
        })
    }

    function watchVideo(videoId){
        let vidIframe = `
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        $("#video").empty().append(vidIframe);

    }

    function loadVids(vidArr){
        vidArr.forEach(function(item){
            let vidUrl = item.id;
            let vidTitle = item.snippet.title;
            let vidImg = item.snippet.thumbnails.medium.url;
            let vidView = item.statistics.viewCount;
            let vidDuration = item.contentDetails.duration;
            let vidHour = 0;
            let vidMinute = 0;
            let vidSec = 0;
            if( vidDuration.indexOf('H') >= 0){
                vidHour = vidDuration.replace("PT","").split("H")[0] + ":"; // PT4h18M1S, [4,18m1s]
                vidMinute = vidDuration.replace("PT","").split("H")[1].split('M')[0];
                if(vidMinute < 10){ vidMinute = 0 + vidMinute; }
                vidSec = vidDuration.replace("PT","").split("H")[1].split('M')[1].split('S')[0];
            
            }else{
                vidHour = "";
                vidMinute = vidDuration.replace("PT","").split("M")[0];
                vidSec = vidDuration.replace("PT","").split('M')[1].split('S')[0];
            }
            if(vidSec < 10){ vidSec = 0 + vidSec; }
            
            let viewFix = vidViewFix(vidView);
            let vidInfo = `
            <div class="item" data-id=${vidUrl}>
                <div class="photo">
                    <img src="${vidImg}" alt="">
                    <span class="vidTime">${vidHour}${vidMinute}:${vidSec}</span>
                </div>
                <div class="info">
                    <h3 class="title">${vidTitle}</h3>
                    <p class="view">觀看次數：${viewFix}</p>
                </div>
                <a class="vidLink" href="javascript:;" title="${vidTitle}"></a>
            </div>
            `;
            $(".video-list").append(vidInfo);
        })
    }
    
    function vidViewFix(vidView){
        if(vidView > 100000){
            vidView =  (vidView / 10000).toFixed() + "萬次";
            return vidView
        }
        if(vidView >= 10000 && vidView < 100000){
            vidView =  (vidView / 10000).toFixed(1) + "萬次";
            return vidView
        }
        if(vidView <= 9999){
            vidView =  (vidView / 10000).toFixed(1) + "次";
            return vidView
        }
    }

})

