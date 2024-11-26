function Home() {
    return (
        <div>
            <div>Você está em uma área pública.</div>
            <div class="bg-blue-500 text-white text-center p-4">
                <a href="/login">Login</a>
                <a href="/protected">Protected</a>
                <a href="/logout">Logout</a>
            </div>
        </div>
    );
}

export default Home;
