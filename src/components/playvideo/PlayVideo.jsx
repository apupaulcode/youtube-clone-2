import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import userProfile from '../../assets/user_profile.jpg'
import { API_KEY, valueConverter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const PlayVideo = () => {
  const {videoId} = useParams();
  const [apiData,setApiData] = useState(null);
  const [channelData,setChannelData] = useState(null);
  const [commentData,setCommentData] = useState([]);
  const fetchVideoData = async () =>{
    const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetailsUrl).then(response => response.json()).then(data => setApiData(data.items[0]));
  }
  const fetchOtherData = async () =>{
    const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet.channelId}&key=${API_KEY}`
    await fetch(channelDataUrl).then(res => res.json()).then(data => setChannelData(data.items[0]))

    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
    await fetch(commentUrl).then(res => res.json()).then(data => setCommentData(data.items))
  }
  useEffect(()=>{
    fetchVideoData();
  },[videoId])
  useEffect(()=>{
    fetchOtherData();
  },[apiData])
  return (
    <div className='play-video'>
      {/* <video src={video} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow='autoplay' allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title:'Title Here'}</h3>
      <div className="play-video-info">
        <p>{apiData?valueConverter(apiData.statistics.viewCount):'0'} views &bull;{apiData? moment(apiData.snippet.publishedAt).fromNow():null} </p>
        <div>
          <span><img src={like} alt="" />{valueConverter(apiData?.statistics.likeCount)}</span>
          <span><img src={dislike} alt="" />2</span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet.thumbnails.default.url} alt="" />
        <div>
          <p>{apiData?.snippet.channelTitle}</p>
          <span>{valueConverter(channelData?.statistics.subscriberCount)}</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='vid-subscription'>
        <p>{apiData?.snippet.description.slice(0,250)}</p>
        <hr />
        <h4>{valueConverter(apiData?.statistics.commentCount)}</h4>
        {
          commentData?.map((item,index)=>{
            console.log(commentData)
            return(
              <div key={index} className="comment">
                <img src={item?.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                  <h3>{item?.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                  <p>{item?.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>{valueConverter(item?.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default PlayVideo
