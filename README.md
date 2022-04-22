# videojs1
创建视频播放器<br>
普通属性<br>
data-adssrc	设置插播的广告路径,首先把需要播放的视频文件放入当前项目/static 文件中, 那么,视频地址就为 /xxx.mp4.如不需要插播广告,则该项不填写.	"/kitteh.mp4"<br>
data-upsrc	清晰度选择控件设置.如不需要清晰度控件,则该项不填写.	[{"src": "/oceans.mp4","type": "video/mp4","label": "标清","res":360},{"src": "/oceans.mp4","type": "video/mp4","label": "高清","res":720},{"src": "/oceans.mp4","type": "video/mp4","label": "超清","res":1080}]<br>
data-yeshls	设置视频播放器是否开启直播播放功能.该项设置仅用于视频直播播放端的播放情景.即:当观看直播的一方使用播放器进行观看时,需要将该项设置为开启.如果是直播录制的一方使用播放器进行录制时,则需要设置为关闭	"0"<br>
data-autoplay	设置视频播放器是否自动播放.若设置为开启,则视频播放器在初始化之后,不需要手动点击播放按钮,就开始自动播放	"0"<br>
data-loop	设置视频播放器是否循环播放.若设置为开启,则视频播放器在播放完毕之后,会自动重新播放,并一直循环	"0"<br>
data-preload	设置视频源预加载时间.默认为'auto',立即开始加载视频	"auto"<br>
data-adshref	如果您设置了添加广告,并且想在点击广告时进行跳转,那么请在这里设置您要跳转的路径.	"//www.baidu.com"<br>
data-lang	用于设置视频元素提示信息的语言，默认为中文	"zh-CN"<br>
data-bigbutton	设置视频初始化后，控制视频播放的大按钮的位置。默认在视频左上角。	"default"<br>
data-bigbutshape	设置大按钮的形状.默认为圆角长方形,可以设置为圆形	"default"<br>
data-nowtime	用于超过播放时间尔触发事件,与触发事件性timeout一起使用	10<br>
data-setbtn	设置开启视频倍速模式(配合设置倍速播放使用)	false/true<br>
data-setup	设置视频倍速播放	[0.5,1,2]<br>
data-downloadbutton	是否设置下载视频按钮显示隐藏	false/true<br>
控制属性<br>
data--vsrc	需要播放的视频的路径。首先把需要播放的视频文件放入当前项目/static 文件中, 那么视频地址就为 /xxx.mp4. 注意:只有对应的视频文件存在, 本元素才可正常播放。若开启视频清晰度选择按钮,则视频源路径不需要设置.	"/oceans.mp4"<br>
data--poster	设置视频的海报,视频的海报表现为视频初始化之后，视频表面默认显示的图片.	"/img/demo.jpg"<br>
data--state	设置视频的状态.有两个值:'play'(开始播放),'pause'(暂停播放)	"play"<br>
data--muted	设置媒体音量静音功能，true为静音，false不静音	true/false<br>
data--exitfullscreen	设置视频播放器退出全屏属性	exitfullscreen<br>
输出属性
data-x-inited	当元素初始化完成之后,该属性值为true.初始值(默认)为false	true<br>
data-x-currenttime	视频播放时，输出视频播放的时间，该时间是指视频目前播放了多久。该值为秒数，即如果值是6，表示视频已经播放了6秒	"6.698357"<br>
data-x-videotime	播放器添加视频,输出该视频时间总长度,以秒计算.	"366.6"<br>
data-x-state	视频播放器输出当前的播放状态	play/pause<br>
data-x-errotcode	视频播放器播放错误输出的错误码	4<br>
data-x-errormessage	视频播放器播放错误输出的错误信息	无法找到此视频兼容的源<br>

发出事件<br>	
wwadstart	当广告开始播放时触发。此事件只触发一次，在广告开始播放时的一瞬触发一次	<br>
wwadsend	当广告播放完毕时触发。此事件只触发一次，在广告播放完毕时的一瞬触发一次<br>
wwresolutionchange	您的播放器开启清晰度选择按钮的条件下，当切换清晰度时触发	<br>
fullscreenclick	当您点击全屏按钮时触发	<br>
nofullscreenclick	当您点击退出全屏按钮时触发<br>	
video.timeupdate	视频正在播放时触发，即只要视频正在播放，该事件就存在	<br>
timeout	当超过设定的播放时间时,触发事件,循环播放可多次触发,播放当中,拖动时间条不会触发	<br>
videofail	当目前视频播放器不支持您使用的视频源格式时候发出的事件。	<br>
videoNoCompatible	当无法找到此视频兼容的源的时候发出的事件	<br>
videoend	当视频播放结束的时候发出的事件	<br>
videoplay	当视频播放开始的时候发出的事件<br>

# 注意事项
1、安卓端video视频播放禁止全屏播放需要在video标签上添加  x5-video-player-type="h5-page"<br>
2、ios端video视频播放禁止全屏播放需要在video标签上添加  webkit-playsinline="true" playsinline="true" <br>
3、使用视频播放器必须在video元素上设置高度<br>
4. 设置视频播放器清晰度按钮样式<br>
`.vjs-resolution-button-staticlabel{position:absolute;top:2px;right:15px;}`

5.设置是否显示下载视频按钮的样式<br>
`.video-js .vjs-download-button-control { width: 14px!important; height: 100%!important; margin: 0 1em!important;}a:focus { outline: 0!important};`<br>

6.视频播放器时间样式 需求:时间进度/全片时长<br>

```css
<style type="text/css">
.video-js .vjs-time-control {
    display: block!important;
}
.video-js .vjs-remaining-time {
    display: none!important;
}
.video-js .vjs-time-control{
    padding:0 3px!important;
    min-width:0!important;
  }
</style>
```
