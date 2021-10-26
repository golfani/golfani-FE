import Document, { Html, Head, Main, NextScript,DocumentContext } from 'next/document'

/**
 * Next.js 제공하는 Document 를 커스텀마이즈 하여 사용 할 수 있다.
 * Next.js 페이즈들은 마크업 정의 건너띄고 페이지 들을 만들기 때문에
 * <HTML> <BODY> <HEAD> 태그를 만질때에는 _document 파일을 필수 적으로 사용 해야 한다.
 */

class MyDocument extends Document {
    // static async getInitialProps(ctx: DocumentContext) {
    //     const initialProps = await Document.getInitialProps(ctx)
    //     return { ...initialProps }
    // }

    render() {
        return (
            <Html lang="ko">
                <Head>
                    <title>GOLF ANI</title>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument;