import "./globals.css";
import { Figtree } from "next/font/google";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserid from "@/actions/getSongsByUserid";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
    title: "Spotify Clone",
    description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userSongs = await getSongsByUserid();

    return (
        <html lang="en">
            <body className={font.className}>
                <SimpleBar style={{ maxHeight: 500 }}>
                    <ToasterProvider />
                    <SupabaseProvider>
                        <UserProvider>
                            <ModalProvider />
                            <Sidebar songs={userSongs}>{children}</Sidebar>
                            <Player />
                        </UserProvider>
                    </SupabaseProvider>
                </SimpleBar>
            </body>
        </html>
    );
}
