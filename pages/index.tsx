import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [showLogin, setShowLogin] = useState(false);
	const [showSignup, setShowSignup] = useState(false);
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signupEmail, setSignupEmail] = useState("");
	const [signupPassword, setSignupPassword] = useState("");
	const [signupConfirm, setSignupConfirm] = useState("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			setIsLoggedIn(!!session?.user);
		});
		return () => {
			listener?.subscription.unsubscribe();
		};
	}, []);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		// Optionally redirect or show a message
		router.push("/");
	};

	// Handle login
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const { error } = await supabase.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword,
		});
		if (error) setError(error.message);
		else {
			setShowLogin(false);
			router.push("/pantry");
		}
	};

	// Handle signup
	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (signupPassword !== signupConfirm) {
			setError("Passwords do not match.");
			return;
		}
		const { error } = await supabase.auth.signUp({
			email: signupEmail,
			password: signupPassword,
		});
		if (error) setError(error.message);
		else setShowSignup(false);
	};

	return (
		<>
			<Navbar
				onLoginClick={() => setShowLogin(true)}
				onSignupClick={() => setShowSignup(true)}
				onSignOutClick={handleSignOut}
				isLoggedIn={isLoggedIn}
			/>
			<div className="min-h-screen flex bg-[#f4fdf9]">
				{/* Left */}
				<div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
					<div className="flex flex-col items-center z-10 px-8">
						<h1
							className="text-5xl font-bold text-green-700 mb-4"
							style={{ fontFamily: "'Poppins', sans-serif" }}
						>
							<span className="inline-flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									className="h-10 w-10 text-green-700"
									fill="currentColor"
								>
									<path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
								</svg>
								ShelfLife
							</span>
						</h1>
						<p className="text-lg text-gray-700 mb-8 text-center max-w-md">
							Track your food's expiration dates, reduce waste, and save money.
						</p>
						<div className="flex gap-4">
							<button
								onClick={() => setShowLogin(true)}
								className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
							>
								Log In
							</button>
							<button
								onClick={() => setShowSignup(true)}
								className="px-6 py-2 bg-white border border-green-600 text-green-700 rounded hover:bg-green-50 transition"
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
				{/* Right */}
				<div
					className="w-1/2 h-screen relative hidden md:block m-10 rounded-sm shadow-md"
					style={{
						backgroundImage: "url('/images/homepage-bg.jpg')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
			</div>

			<Modal open={showLogin} onClose={() => setShowLogin(false)}>
				<h2 className="text-2xl font-bold mb-4">Log In</h2>
				<form onSubmit={handleLogin}>
					<input
						className="border p-2 mb-2 w-full"
						type="email"
						placeholder="Email"
						value={loginEmail}
						onChange={(e) => setLoginEmail(e.target.value)}
						required
					/>
					<input
						className="border p-2 mb-4 w-full"
						type="password"
						placeholder="Password"
						value={loginPassword}
						onChange={(e) => setLoginPassword(e.target.value)}
						required
					/>
					{error && <div className="text-red-600 mb-2">{error}</div>}
					<button className="w-full bg-green-600 text-white py-2 rounded" type="submit">
						Log In
					</button>
				</form>
			</Modal>

			<Modal open={showSignup} onClose={() => setShowSignup(false)}>
				<h2 className="text-2xl font-bold mb-4">Sign Up</h2>
				<form onSubmit={handleSignup}>
					<input
						className="border p-2 mb-2 w-full"
						type="email"
						placeholder="Email"
						value={signupEmail}
						onChange={(e) => setSignupEmail(e.target.value)}
						required
					/>
					<input
						className="border p-2 mb-2 w-full"
						type="password"
						placeholder="Password"
						value={signupPassword}
						onChange={(e) => setSignupPassword(e.target.value)}
						required
					/>
					<input
						className="border p-2 mb-4 w-full"
						type="password"
						placeholder="Confirm Password"
						value={signupConfirm}
						onChange={(e) => setSignupConfirm(e.target.value)}
						required
					/>
					{error && <div className="text-red-600 mb-2">{error}</div>}
					<button className="w-full bg-green-600 text-white py-2 rounded" type="submit">
						Sign Up
					</button>
				</form>
			</Modal>

			<Footer />
		</>
	);
}
