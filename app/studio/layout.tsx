import { Metadata } from "next"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata:Metadata = {
    title: "The Creative Journal",
    description: "The Creative Journal is headquartered in Kingston, Jamaica © 2025 The Creative Journal. Developed by The Creative Journal",
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
        <body>
            {children}
        </body>
    </html>
  )
}
export default RootLayout