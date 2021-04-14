import '../styles/globals.css';
import Head from 'next/head';
import { wrapper } from 'src/next-store';
import App from 'next/app';

class MyApp extends App {
    static getInitialProps = async ({ Component, ctx }) => {
        // ctx.store.dispatch({ type: 'TOE', payload: 'App was set in _app' });
        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}),
                // Some custom thing for all pages
                pathname: ctx.pathname,
            },
        };
    };

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link
                        rel="stylesheet"
                        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossOrigin="anonymous"
                    />
                    <script
                        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                        crossOrigin="anonymous"
                    ></script>
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                        crossOrigin="anonymous"
                    ></script>
                    <script
                        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                        crossOrigin="anonymous"
                    ></script>
                </Head>
                <Component {...pageProps} />
            </>
        );
    }
}

export default wrapper.withRedux(MyApp);
