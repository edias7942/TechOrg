function Home() {
    return (
        <div>
            <div>Você está em uma área pública.</div>
            <div class="bg-blue-500 text-white text-center p-4">
                <p><a href="/login">Login</a></p>
                <p><a href="/protected">Protected</a></p>
                <p><a href="/logout">Logout</a></p>
            </div>
        </div>
    );
}

export default Home;
