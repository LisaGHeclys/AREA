import React from 'react';
import './index.scss';
import Header from '../../components/Header';

const buttons = [
    {
        name: 'HOME',
        path: '/',
        isButton: false,
    },
    {
        name: 'LOGIN',
        path: '/login',
        isButton: true,
    },
];

function Home() {
    return (
        <div className="homepage">
            <Header buttons={buttons} />
            <div className="firstPart">
                <img className="img1" src="Home_1.svg" alt="Home_1" />
                <img className="img_vector1" src="Vector_1.svg" alt="Vector_1" />
                <div className="firstPartTexts">
                    <div className="mainText">
                        Come find a list of all
                        <br />
                        the services we give you
                    </div>
                    <div className="secondaryText">
                        Instead of having everything on differents devices or <br />
                        applications, find everything you need in one place.
                    </div>
                </div>
                <img className="img_vector2" src="Vector_2.svg" alt="Vector_2" />
            </div>
            <div className="secondPart">
                <img className="img_vector3" src="Vector_3.svg" alt="Vector_3" />
                <img className="img_vector4" src="Vector_4.svg" alt="Vector_4" />
                <div className="thirdText">
                    Automate the process between your
                    <br />
                    various services
                </div>
                <div className="fourthText">
                    Look how you can link multiple
                    <br />
                    applications
                </div>
                <img className="img2" src="Home_2.svg" alt="Home_2" />
            </div>
            <div className="thirdPart">
                <img className="img3" src="Home_3.svg" alt="Home_3" />
                <img className="img_vector5" src="Vector_5.svg" alt="Vector_5" />
                <div className="fifthText">
                    Trigger the process
                    <br />
                    based on events
                </div>
                <img className="ifThen_vector" src="IfThen_vector.svg" alt="ifThen" />
                <img className="vector_break" src="Vector_6.svg" alt="Vector_6" />
            </div>
        </div>
    );
}

export default Home;
