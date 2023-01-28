import './index.scss';

import Header from '../../components/Header';

const buttons = [
    {
        name: 'HOME',
        path: '/',
        isButton: false,
    },
    {
        name: 'LOG IN',
        path: '/login',
        isButton: true,
    },
];

function Page404() {
    return (
        <div>
            <Header buttons={buttons} />
            <div className="page">
                <h1 style={{padding: 200}}>Page inconnue...</h1>
                <div className="center">
                    <div className="froggy">
                        <div className="froggy-head">
                            <div className="left-eye">
                                <div className="left-sclera"></div>
                                <div className="left-pupil"></div>
                            </div>
                            <div className="right-eye">
                                <div className="right-sclera"></div>
                                <div className="right-pupil"></div>
                            </div>
                        </div>
                        ^<div className="froggy-body"></div>
                        <div className="left-leg"></div>
                        <div className="right-leg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page404;
