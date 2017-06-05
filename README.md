# Cicadas-Radio——蝉眠电台
————by 鸽王 on Unique Hackday 4th June
## 
沙沙沙...来源不明的电台里有来源不明的白噪声！

原来我还可以定义这个电台的播放内容！这么神奇的吗！

### 作品简介
24小时内，我们用树莓派做了一个私人电台站，可以向周围发送广播信号————信号范围内打开收音机调节频率就可以听到；
你可以从前端页面定义该频段下一段你想听到的音频，也可以从页面上传自己的音频，加入电台播放列表。

这里有来自夏夜的白噪电台，坐在床上倾听蛙鸣虫唱，仿佛置身自然的怀抱；
更重要的是你可以生成自己的专属电台，向周围的人传达自己的信号。

### 作品特性
一段令人平静的声波，闭眼看到整个世界；
一个小小的交友平台，声音转达瞬时情感。

### 作品结构
- 服务器：

  语言：php 
  
  定义广播的播放列表，处理前端请求

- 树莓派

  语言：python
  
  拉取服务器上的音频，向周围发送广播信号

- 前端

  语言：coffeescript
  
  模拟电台收听，修改播放列表，上传音频文件

### 鸣谢
鸽王五人组

哇，最后我们竟然没有鸽
