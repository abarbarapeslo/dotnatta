import { signIn } from "next-auth/react";

function Home() {
    async function GitHubLogin() {
        await signIn("github", {
            callbackUrl: "/",
        });
    }

    return (
        <>
            <button type="button" onClick={GitHubLogin}>
                Entrar com GitHub.
            </button>
        </>
    );
}

export default Home;
