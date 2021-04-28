import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import appAction from 'src/store/app/action';
import Loading from 'src/layout/Loading/Loading';
import { useCookies } from 'react-cookie';

function MyAppWithRedux({ Component, pageProps }) {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const routeChangeStart = () => {
            dispatch(appAction.SET_APP_LOADING(true));
        };
        const routeChangeComplete = () => {
            dispatch(appAction.SET_APP_LOADING(false));
        };
        router.events.on('routeChangeStart', routeChangeStart);
        router.events.on('routeChangeComplete', routeChangeComplete);
        return () => {
            router.events.off('routeChangeStart', routeChangeStart);
            router.events.off('routeChangeComplete', routeChangeComplete);
        };
    }, []);
    const isLoading = useSelector((state) => {
        return state?.App?.loading;
    });
    return (
        <>
            {isLoading && <Loading />}
            <main>
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyAppWithRedux;
