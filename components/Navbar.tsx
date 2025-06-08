import Link from "next/link";

type NavbarProps = {
	isLoggedIn: boolean;
	onLoginClick: () => void;
	onSignupClick: () => void;
	onSignOutClick: () => void;
};

export default function Navbar({
	isLoggedIn,
	onLoginClick,
	onSignupClick,
	onSignOutClick,
}: NavbarProps) {
	return (
		<nav className="w-full bg-green-700 py-4 px-8 flex justify-between items-center">
			<Link href="/" className="text-white text-2xl font-bold">
				<span className="inline-flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						className="h-10 w-10 text-white-700"
						fill="currentColor"
					>
						<path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
					</svg>
					ShelfLife
				</span>
			</Link>
			<div className="flex gap-6">
				<Link href="/pantry" className="text-white hover:underline">
					Pantry
				</Link>
				{isLoggedIn ? (
					<button
						onClick={onSignOutClick}
						className="text-white hover:underline bg-transparent border-none outline-none"
						type="button"
					>
						Sign Out
					</button>
				) : (
					<>
						<button
							onClick={onLoginClick}
							className="text-white hover:underline bg-transparent border-none outline-none"
							type="button"
						>
							Log In
						</button>
						<button
							onClick={onSignupClick}
							className="text-white hover:underline bg-transparent border-none outline-none"
							type="button"
						>
							Sign Up
						</button>
					</>
				)}
			</div>
		</nav>
	);
}
