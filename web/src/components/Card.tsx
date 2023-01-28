import {useState} from 'react';
import {serviceSubscribe, serviceUnsubscribe} from '../ApiFunctions/serviceActions';
import {poptastic} from '../helpers/poptastic';
import '../scss/card.scss';
import Loader from './Loader';

function Card({name, description, image, isSubbed, service, forceRefresh}: any) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCardClick: any = async () => {
        setIsLoading(true);
        let res;
        try {
            if (isSubbed) {
                res = await serviceUnsubscribe(service);
            } else {
                res = await serviceSubscribe(service);
            }
            if (res.error && res.errorCode === 'NO_GOOGLE_PROVIDER') {
                poptastic((process.env.REACT_APP_SERVER_URL || 'http://localhost:8080') + '/auth/google/provider', () => {});
                return;
            }
            if (res.error && res.errorCode === 'NO_TWITCH_PROVIDER') {
                poptastic(
                    (process.env.REACT_APP_SERVER_URL || 'http://localhost:8080') + `/auth/twitch/${localStorage.getItem('jwt')}/provider`,
                    () => {},
                );
                return;
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
            forceRefresh(true);
        }
    };

    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={name} height={90} />
            </div>
            <div className="card-content">
                <h2 className="card-title">{name}</h2>
                <p className="card-description">{description}</p>
                <button
                    className={'card-button ' + (isSubbed && 'card-button-subbed')}
                    onClick={() => {
                        handleCardClick();
                    }}>
                    {isLoading && <Loader />}
                    {isSubbed ? <>Unsubscribe</> : <>Subscribe</>}
                </button>
            </div>
        </div>
    );
}

export default Card;
