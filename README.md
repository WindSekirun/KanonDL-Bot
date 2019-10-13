# KanonDL-Bot

(KR Only) TelegramBot with download video/audio from various site 
This bot contains these dependencies.

* node-youtube-dl https://github.com/przemyslawpluta/node-youtube-dl
* Youtube-DL https://github.com/ytdl-org/youtube-dl
* node-telegrambot-api https://github.com/yagop/node-telegram-bot-api

## Todo

퍼블릭 릴리즈 후 해도 되는 작업들 (우선순위 낮음)
* Compat 모드 붙이기
* 유투브일 경우 검색 모드

## 빌드

실행하기 전 ffmpeg의 바이너리가 필요합니다. os에 따라 설치해주세요.
```
apt install ffmpeg // ubuntu
choco install ffmpeg // chocolately
```

```
npm install
./start.sh
```

### Disclamier
```
KanonBot을 이용하기 위해 송신한 데이터(예: URL)에 대한 책임은 모두 사용자에게 있습니다.

KanonBot 서비스 이용 법적 정당성을 확인하는 것은 모두 사용자의 책임으로 간주합니다.

KanonBot 서비스 이용의 적법성은 국가 및 지역의 법에 따라 다를 수 있습니다.

KanonBot은 기술적 플랫폼만 제공합니다. 따라서 KanonBot을 통한 콘텐츠 다운로드의 적법성에 대한 책임은 모두 사용자 및 사용자가 이용한 제 3자 서비스 제공자에게 있습니다.

이 점 유의해주시고 사용해주세요.
```

## License
```
MIT License

Copyright (c) 2019 WindSekirun (wind.seo)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
