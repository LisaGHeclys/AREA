import {useEffect, useRef, useState} from 'react';
import './index.scss';

import Header from '../../components/Header';
import Card from '../../components/Card';
import {getUser} from '../../ApiFunctions/getUser';

const buttons = [
    {
        name: 'SERVICES',
        path: '/services',
        isButton: false,
    },
    {
        name: 'AREA',
        path: '/areas',
        isButton: false,
    },
    {
        name: 'LOG OUT',
        path: '/',
        isButton: true,
    },
];

interface serviceType {
    name: string;
    image: string;
    description: string;
    isSubbed: boolean;
}

const servicesList: serviceType[] = [
    {
        name: 'Discord',
        description:
            'Discord is a free proprietary VoIP and instant messaging software. It runs on Windows, macOS, Linux, Android, iOS operating systems and web browsers.',
        image: 'https://imgs.search.brave.com/Qf2C249KecBbNreyWcgbUD3_oCyxVVzStJS4lhP1Mv4/rs:fit:660:503:1/g:ce/aHR0cHM6Ly9zdGF0/aWMubWlyYWhlemUu/b3JnL2ZyZXNod2Vi/c2l0ZXN3aWtpL3Ro/dW1iL2EvYWYvRGlz/Y29yZF9Mb2dvLnBu/Zy82NjBweC1EaXNj/b3JkX0xvZ28ucG5n',
        isSubbed: false,
    },
    {
        name: 'Twitter',
        description:
            'Twitter is a microblogging and social networking service on the Internet. It allows its users to publish messages called tweets, limited to 280 characters.',
        image: 'https://imgs.search.brave.com/HSqZIViVT05nuvKYi1zxI4wa9U4S0cYVgXJBDNUjowc/rs:fit:1200:1200:1/g:ce/aHR0cDovLzEwMDBs/b2dvcy5uZXQvd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDYv/VHdpdHRlci1Mb2dv/LnBuZw',
        isSubbed: false,
    },
    {
        name: 'GMail',
        description:
            'Gmail is a free email service provided by Google. It is accessible from a web browser or email client, and is compatible with POP3 and IMAP protocols.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png',
        isSubbed: false,
    },
    {
        name: 'Google Calendar',
        description:
            'Google Calendar is a free online calendar service developed by Google. It allows you to manage shared calendars and synchronize events with other calendars.',
        image: 'https://imgs.search.brave.com/rxuUwYidxKqNfeoAv0IwoC1d7oNUl_sx3l0sExQ1iUc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c21hcmNhcy5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDQvR29vZ2xlLUNh/bGVuZGFyLUxvZ28u/cG5n',
        isSubbed: false,
    },
    {
        name: 'Flight Tracker',
        description:
            'Flight Tracker is an online flight tracking service. It allows you to track flights in real time and receive notifications.',
        image: 'https://imgs.search.brave.com/XR1oFJO3S6kymy7SWOXLF3DCXz_RzrJUo4zw_0_fyj4/rs:fit:820:820:1/g:ce/aHR0cHM6Ly9pbWcu/ZmF2cG5nLmNvbS8x/OC8wLzE5L2FpcnBs/YW5lLWFpcmNyYWZ0/LWZsaWdodC1sb2dv/LWNsaXAtYXJ0LXBu/Zy1mYXZwbmctTThN/NzFrckVZcDk0UjlE/M3B0SlJ3R2N6US5q/cGc',
        isSubbed: false,
    },
    {
        name: 'Twitch',
        description:
            'Twitch is a live streaming video platform owned by Twitch Interactive, a subsidiary of Amazon. It is primarily used for video gaming, including playthroughs of video games.',
        image: 'https://imgs.search.brave.com/-cvosxS09zMUJkZSkUd3C7p2meI0kC8hb140jvzNr1I/rs:fit:800:799:1/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvdHdpdGNoL3R3/aXRjaF9QTkc0Ni5w/bmc',
        isSubbed: false,
    },
];

function Services() {
    const [services, setServices] = useState(servicesList);
    const [forceRefresh, setForceRefresh] = useState(true);
    const ref = useRef(false);

    useEffect(() => {
        if (!forceRefresh) return;
        setForceRefresh(false);
        const fetchServices = async () => {
            const response = await getUser();
            const user = response[0];
            const newServices = services.map((service, i) => {
                if (user.services.includes(i)) service.isSubbed = true;
                else service.isSubbed = false;
                return service;
            });
            return newServices;
        };
        const newServices = fetchServices();
        newServices.then((newServices) => {
            setServices(newServices);
        });
    }, [forceRefresh, services]);

    useEffect(() => {
        if (ref.current) {
            return;
        }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const provider = urlParams.get('provider');
        const accessToken = urlParams.get('token');
        const refreshToken = urlParams.get('refresh');
        if (window.opener) {
            window.opener.postMessage({provider, accessToken, refreshToken});
            ref.current = true;
            window.close();
        }
    }, []);

    return (
        <>
            <Header buttons={buttons} />
            <div className="page">
                <div className="services">
                    <div className="grid">
                        {services.map((service: any, id: number) => (
                            <Card
                                name={service.name}
                                image={service.image}
                                description={service.description}
                                service={id}
                                key={id}
                                forceRefresh={setForceRefresh}
                                isSubbed={service.isSubbed}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Services;
