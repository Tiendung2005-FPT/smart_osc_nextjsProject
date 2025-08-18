export default function Header() {
    return (
        <header className="header-container flex justify-between px-25 bg-linear-to-r from-[#2C3E50] to-[#4A648F] text-white">
            <div className="header-brand flex justify-center items-center gap-3 cursor-pointer">
                <div className="header-brand-icon-wrapper">
                    <i className="bi bi-book-half header-brand-icon text-[3rem] text-[#FF6B6B]"></i>
                </div>
                <div className="header-brand-text">
                    <div className="header-title font-bold text-2xl">Library Portal</div>
                    <div className="header-subtitle">Student Access System</div>
                </div>
            </div>
            <div className="header-user-section flex justify-center items-center gap-7">
                <div className="header-user-info flex justify-center items-center gap-2 cursor-pointer group">
                    <i className="bi bi-person header-user-avatar text-2xl group-hover:text-blue-200"></i>
                    <div>
                        <div className="header-user-name">Test Student</div>
                        <div className="header-user-role text-sm text-neutral-300">Student</div>
                    </div>
                </div>
                <div className="header-history flex justify-center items-center gap-2 cursor-pointer group">
                    <i className="bi bi-hourglass text-2xl group-hover:text-blue-200"></i>
                    <div>History</div>
                </div>

                <div className="header-login flex justify-center items-center gap-2 cursor-pointer hover:text-green-200">
                    <div className="login-icon">
                        <i className="fa-solid fa-right-to-bracket"></i>
                    </div>
                    <div className="login-text">Login</div>
                </div>
            </div>
        </header>

    )
}