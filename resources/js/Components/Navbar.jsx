import { Link } from "@inertiajs/react";

const Navbar = ({ user }) => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">
                    Anthesis News
                </a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Prescription02&hairColor=BlondeGolden&facialHairType=BeardMajestic&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Gray01&eyeType=Side&eyebrowType=UnibrowNatural&mouthType=Vomit&skinColor=Light" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        {user ? (
                            <>
                                <li>
                                    <Link
                                        className="justify-between"
                                        href={route("dashboard")}
                                        as="button"
                                    >
                                        Dashboard
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link>Settings</Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("logout")}
                                        as="button"
                                        method="post"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href={route("login")} as="button">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route("register")} as="button">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
