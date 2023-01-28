# Epitech AREA - by On Area La
> This is an Epitech 3rd-year project.

## Introduction
The goal of this project is to make a dashboard-style web app to gather feeds from multiple external APIs and centralize them into one interface.

The project must implement a software suite that functions similar to that of [IFTTT](https://ifttt.com/) and/or [Zapier](https://zapier.com/)

## The project
<strong>The project is organized in three parts:</strong>
1. The mobile front-end is located under `mobile/`
2. The desktop/web front-end is located under `desktop/`
3. The back-end is located under `api/`

## Technologies used
- Docker

- API:
  - NestJS
  - Passport
  - SQLite
  - Prisma
  - AWS elastic beanstalk
  - Swagger
 
- Web application:
  - React
  - TypeScript
  - Scss

- Mobile application :
  - ReactNative
  - TypeScript
  - Metro
  - Gradlew 

## Prerequisites
- Docker

## How to launch the project
#### Run the following commands to launch the three parts of the project
```
docker-compose build && docker-compose up
```

## Services and Widgets implemented
#### - GMAIL
  - Get a new Mail
  - new mail sent
  -> send a mail
  -> create a new draft
  -> create a new document on drive

#### - TWITTER
  - Get new tweets from User
  - Get all the new followers

#### - FLIGHT TRACKER
  - Get the flights from City in a 50 km radius

#### - TWITCH
  - Streamer went live
  - New streamer has most views
  - New Hype Train
  -> Send a whisper

#### - CALENDAR
  - Get events of a calendar in less than 1 hour
  -> Create new event
  
#### - DISCORD
  -> Send message on webhook

## API documentation
Find our documentation under `doc/`

## Postman

## Useful endpoints

You can get informations about the project by sending an HTML GET request on endpoint `/about.json`.

You can also download our apk on the website.

## Contributors
Back-End | API | Database:
- [Maxence Pellouin](https://github.com/mpellouin)
- [Laurent Cazette](https://github.com/Laurent-cazette)

Web application :
- [Justine Trupheme](https://github.com/Flackho)
- [Florian Gibault](https://github.com/Fgib)
- [Maxence Pellouin](https://github.com/mpellouin)

Mobile application :
- [Lisa Glaziou](https://github.com/LisaGHeclys)
- [Laurent Cazette](https://github.com/Laurent-cazette)
