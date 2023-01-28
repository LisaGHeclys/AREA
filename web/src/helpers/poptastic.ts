import {serviceSubscribe} from '../ApiFunctions/serviceActions';
import {updateProvider} from '../ApiFunctions/updateProvider';

export const poptastic = (url: string, navigate: any) => {
    var newWindow = window.open(url, 'name', 'height=600,width=450') as Window;
    newWindow.focus();

    window.removeEventListener('message', async (event) => {
        console.log(event.data);
        if (event.data?.provider && event.data?.accessToken && event.data?.refreshToken) {
            await updateProvider(event.data.provider, event.data.token, event.data.refreshToken);
            if (event.data.provider === 'google') {
                await serviceSubscribe(2);
                await serviceSubscribe(3);
            }
            window.location.reload();
        }
        if (event.data.provider && event.data.provider === 'twitch') {
            setTimeout(() => window.location.reload(), 100);
        } else {
            if (event.data !== 'failure') {
                navigate('/areas');
            }
        }
    });

    window.addEventListener('message', async (event) => {
        console.log(event.data);
        if (event.data?.provider && event.data?.accessToken && event.data?.refreshToken) {
            await updateProvider(event.data.provider, event.data.token, event.data.refreshToken);
            if (event.data.provider === 'google') {
                await serviceSubscribe(2);
                await serviceSubscribe(3);
            }
            window.location.reload();
        }
        if (event.data.provider && event.data.provider === 'twitch') {
            setTimeout(() => window.location.reload(), 100);
        } else {
            if (event.data !== 'failure' && !event.data.payload) {
                navigate('/areas');
            }
        }
    });
};
