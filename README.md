# KanonDL-Bot

Telegram Bot with download ~~video~~/audio from Youtube, niconico and supported site

This bot contains these dependencies.

* node-youtube-dl https://github.com/przemyslawpluta/node-youtube-dl
* Youtube-DL https://github.com/ytdl-org/youtube-dl
* node-telegrambot-api https://github.com/yagop/node-telegram-bot-api

## Todo

퍼블릭 릴리즈 전 해야될 작업들

* Compat 모드 붙이기
* Jenkins 체크
* Docker 배포 및 UzukiLive 서버 업로드 

퍼블릭 릴리즈 후 해도 되는 작업들 (우선순위 낮음)

* link 검사 부분을 extractor_info 태워서 검사, youtube:playlist 예외처리 (지원하지 않을 스펙)
* 유투브일 경우 검색 모드 
* 이슈 제안에 대한 대화형 모드
* 기타 여러가지 사안들...