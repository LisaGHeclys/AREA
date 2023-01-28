const actionsList: {
  id: number;
  name: string;
  serviceId: number;
  params: {
    placeholder: string;
    name: string;
    type?: string;
  }[];
}[] = [
  {
    id: 1,
    name: 'New tweet from @X',
    serviceId: 1,
    params: [
      {
        placeholder: 'Twitter username to fetch',
        name: 'twitterAccount',
      },
    ],
  },
  {
    id: 2,
    name: 'New follower on account X',
    serviceId: 1,
    params: [
      {
        placeholder: 'Twitter id to lookup',
        name: 'twitterId',
      },
    ],
  },
  {
    id: 3,
    name: 'New flight 50km around coordinates X Y',
    serviceId: 4,
    params: [
      {
        placeholder: 'Latitude',
        name: 'lat',
      },
      {
        placeholder: 'Longitude',
        name: 'lon',
      },
    ],
  },
  {
    id: 4,
    name: 'New Google calendar event in less than an hour',
    serviceId: 3,
    params: [
      {
        placeholder: 'Google calendar id',
        name: 'calendarId',
      },
    ],
  },
  {
    id: 5,
    name: 'New message received',
    serviceId: 2,
    params: [
      {
        placeholder: 'Your authenticated gmail address',
        name: 'actionUserId',
      },
    ],
  },
  {
    id: 6,
    name: 'New best stream on Twitch',
    serviceId: 5,
    params: [],
  },
  {
    id: 7,
    name: 'New hype train',
    serviceId: 5,
    params: [
      {
        placeholder: 'your twitch username',
        name: 'twitchUsername',
      },
    ],
  },
  {
    id: 8,
    name: 'Streamer just went live',
    serviceId: 5,
    params: [
      {
        placeholder: 'Streamer username',
        name: 'twitchUsername',
      },
    ],
  },
  {
    id: 9,
    name: 'New Mail sent',
    serviceId: 2,
    params: [
      {
        placeholder: 'Your authenticated gmail address',
        name: 'actionUserId',
      },
    ],
  },
];

const reactionsList: {
  id: number;
  name: string;
  serviceId: number;
  params: {
    placeholder: string;
    name: string;
    type?: string;
  }[];
}[] = [
  {
    id: 1,
    name: 'Send mail to Y',
    serviceId: 2,
    params: [
      {
        placeholder: 'Subject of the mail',
        name: 'subject',
      },
      {
        placeholder: 'Contents of the mail',
        name: 'message',
      },
      {
        placeholder: 'Mail address to send to',
        name: 'to',
      },
    ],
  },
  {
    id: 2,
    name: 'Send message to Discord webhook X',
    serviceId: 0,
    params: [
      {
        placeholder: 'Discord webhook url',
        name: 'webhook',
      },
      {
        placeholder: 'Message to send',
        name: 'content',
      },
      {
        placeholder: 'Username to send as',
        name: 'username',
      },
      {
        placeholder: 'Avatar url to send as',
        name: 'avatar_url',
      },
    ],
  },
  {
    id: 3,
    name: 'Create new Google calendar event',
    serviceId: 3,
    params: [
      {
        placeholder: 'Google calendar id',
        name: 'reaCalendarId',
      },
      {
        placeholder: 'Event name',
        name: 'summary',
      },
      {
        placeholder: 'Event description',
        name: 'description',
      },
      {
        placeholder: 'Event start date',
        name: 'startDate',
        type: 'datetime-local',
      },
      {
        placeholder: 'Event end date',
        name: 'endDate',
        type: 'datetime-local',
      },
    ],
  },
  {
    id: 4,
    name: 'Create a new Google Document',
    serviceId: 2,
    params: [
      {
        placeholder: 'title of your document',
        name: 'title',
      },
    ],
  },
  {
    id: 5,
    name: 'Create a new GMAIL draft',
    serviceId: 2,
    params: [
      {
        placeholder: 'Subject of the mail',
        name: 'subject',
      },
      {
        placeholder: 'Contents of the mail',
        name: 'message',
      },
    ],
  },
  {
    id: 6,
    name: 'Send a twitch whisper to X',
    serviceId: 5,
    params: [
      {
        placeholder: 'Twitch username to send to',
        name: 'to',
      },
      {
        placeholder: 'Message to send',
        name: 'message',
      },
      {
        placeholder: 'Your twitch username',
        name: 'from',
      },
    ],
  },
];

export {actionsList, reactionsList};
