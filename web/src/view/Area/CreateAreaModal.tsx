import {useEffect, useState} from 'react';
import './index.scss';

import createArea from '../../ApiFunctions/createArea';
import Loader from '../../components/Loader';

interface AreaParam {
    id: number;
    name: string;
    serviceId: number;
    params: {
        placeholder: string;
        name: string;
        type?: string;
    }[];
}

export const actionsList: AreaParam[] = [
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

export const reactionsList: AreaParam[] = [
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

const CreateAreaModal = ({setForceRefresh, setIsOpened, user}: any) => {
    const [name, setName] = useState('');
    const [actionId, setActionId] = useState(0);
    const [reactionId, setReactionId] = useState(0);
    const [actionParams, setActionParams] = useState<{[key: string]: string}>({});
    const [reactionParams, setReactionParams] = useState<{[key: string]: string}>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const closeModal = (e: any) => {
            if (e.key === 'Escape') setIsOpened(false);
        };
        window.addEventListener('keydown', closeModal);
        return () => {
            window.removeEventListener('keydown', closeModal);
        };
    });

    useEffect(() => {
        if (setIsOpened) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [setIsOpened]);

    const submitArea = async () => {
        console.log('creating area');
        const area = {
            actionId,
            reactionId,
            ...actionParams,
            ...reactionParams,
            name,
            accessToken: localStorage.getItem('accessToken'),
        };
        console.log(area);
        try {
            setIsLoading(true);
            const res = await createArea(area);
            console.log(res);
            setForceRefresh(true);
            setIsOpened(false);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="areaModal" onClick={() => setIsOpened(false)}>
            <div
                className="areaModalContent"
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <button type="button" className="areaCloseButton" onClick={() => setIsOpened(false)}>
                    X
                </button>
                <div className="areaModalTitle">Create new area</div>
                <div className="areaModalGeneral">
                    <input
                        className="areaModalGeneralName"
                        placeholder="Name"
                        maxLength={32}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flexRow">
                    <div className="areaModalActions">
                        <div className="areaModalActionsTitle">Actions</div>
                        <div className="areaModalActionsList">
                            <select
                                className="areaModalActionsListSelect"
                                value={actionId}
                                onChange={(e) => setActionId(parseInt(e.target.value))}>
                                <option defaultChecked />
                                {actionsList
                                    .filter((reaction) => user.services.includes(reaction.serviceId))
                                    .map((action) => (
                                        <option key={action.id} value={action.id}>
                                            {action.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="areaModalParams">
                            {actionsList
                                .find((param: any) => param.id === actionId)
                                ?.params.map((param: any) => (
                                    <input
                                        type={param?.type ?? 'text'}
                                        key={param.name}
                                        className="areaModalActionsParamsInput"
                                        placeholder={param.placeholder}
                                        value={actionParams[param.name] ?? ''}
                                        onChange={(e) => setActionParams({...actionParams, [param.name]: e.target.value})}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="areaModalReactions">
                        <div className="areaModalReactionsTitle">Reactions</div>
                        <div className="areaModalReactionsList">
                            <select
                                className="areaModalReactionsListSelect"
                                value={reactionId}
                                onChange={(e) => setReactionId(parseInt(e.target.value))}>
                                <option defaultChecked />
                                {reactionsList
                                    .filter((reaction) => user.services.includes(reaction.serviceId))
                                    .map((reaction) => (
                                        <option key={reaction.id} value={reaction.id}>
                                            {reaction.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="areaModalParams">
                            {reactionsList
                                .find((param: any) => param.id === reactionId)
                                ?.params.map((param: any) => (
                                    <input
                                        type={param?.type ?? 'text'}
                                        key={param.name}
                                        className="areaModalReactionsParamsInput"
                                        placeholder={param.placeholder}
                                        value={reactionParams[param.name] ?? ''}
                                        onChange={(e) => setReactionParams({...reactionParams, [param.name]: e.target.value})}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="areaModalButtons">
                    <button className="areaModalButtonsCreate" onClick={() => submitArea()} disabled={isLoading}>
                        {' '}
                        {isLoading && <Loader />}Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAreaModal;
