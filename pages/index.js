import { signIn } from "next-auth/react";

function Home() {
    async function GitHubLogin() {
        await signIn("github", {
            callbackUrl: "/",
        });
    }

    return (
        <>
            <h1>Bem-vinda(o)!</h1>

            <button type="button" onClick={GitHubLogin}>
                Entrar com GitHub
            </button>
        </>
    );
}

export default Home;
