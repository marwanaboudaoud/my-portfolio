
export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">about </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contact">Contact </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}




