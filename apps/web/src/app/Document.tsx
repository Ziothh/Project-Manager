import { PropsWithChildren } from "react"

interface Props {
    
}


const Document: React.FC<PropsWithChildren<Props>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Project Manager</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}


export default Document