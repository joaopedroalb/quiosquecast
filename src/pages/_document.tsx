import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
                
                    <link rel="shortcut icon" href="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Caneca-Cerveja-PNG.png" type="image/x-icon"/>
                    <title>Quioscast</title>
                </Head>
                        <body>
                            <Main />
                            <NextScript />
                        </body>
            </Html>
                    );
    }
}