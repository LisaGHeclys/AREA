import React, {useEffect, useState} from 'react';
import './index.scss';
import Header from '../../components/Header';
import CreateAreaModal, {actionsList, reactionsList} from './CreateAreaModal';
import {useNavigate} from 'react-router-dom';
import getAreas from '../../ApiFunctions/getAreas';
import {getUser} from '../../ApiFunctions/getUser';

const buttons = [
    {
        name: 'SERVICES',
        path: '/services',
        isButton: false,
    },
    {
        name: 'AREAS',
        path: '/areas',
        isButton: false,
    },
    {
        name: 'LOG OUT',
        path: '/',
        isButton: true,
    },
];

const AreaPage = () => {
    const [areas, setAreas] = useState([]);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(true);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (forceRefresh === false) return;
        //TODO: fix next line
        if (localStorage.getItem('jwt') === null) return;
        const fetchAreas = async () => {
            try {
                const res = await getAreas();
                return res;
            } catch (error) {
                console.log(error);
            }
        };
        fetchAreas().then((res) => {
            setAreas(res);
            console.log(res);
        });
        setForceRefresh(false);
    }, [forceRefresh]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            return user[0];
        };
        fetchUser().then((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const jwt = urlParams.get('jwt');
        if (jwt) {
            localStorage.setItem('jwt', jwt);
        } else {
            if (!localStorage.getItem('jwt')) {
                console.log('back to login');
                navigate('/login');
            }
        }
    }, [navigate]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get('jwt');
        if (window.opener) {
            window.opener.postMessage(accessToken);
            window.close();
        }
    });

    return (
        <div className="areaPage">
            <Header buttons={buttons} />
            {isCreateMode && <CreateAreaModal setIsOpened={setIsCreateMode} setForceRefresh={setForceRefresh} user={user} />}
            <div className="areaPageContent">
                <div className="areaPageTitle">Areas list</div>
                <div className="areaPageCreate">
                    <button className="areaPageCreateButton" onClick={() => setIsCreateMode(true)}>
                        Create new area
                    </button>
                </div>
                <div className="areaPageList">
                    {areas.map((area: any, i: number) => (
                        <div key={i} className="areaPageItem">
                            <div className="areaPageItemName">{area.name}</div>
                            <div className="areaPageItemDescription">
                                {(actionsList.find((action) => action.id === area.actionID)?.name ?? 'unknown') +
                                    ' => ' +
                                    (reactionsList.find((reaction) => reaction.id === area.reactionID)?.name ?? 'unknown')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
        </div>
    );
};

export default AreaPage;
