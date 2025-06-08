import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

export default function Pantry() {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [showSignup, setShowSignup] = useState(false);

	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (!data.user) {
				router.replace("/"); // Redirect if not logged in
			} else {
				setIsLoggedIn(true);
			}
		});
		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!session?.user) {
				router.replace("/"); // Redirect if logged out
			} else {
				setIsLoggedIn(true);
			}
		});
		return () => {
			listener?.subscription.unsubscribe();
		};
	}, [router]);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push("/");
	};

	if (isLoggedIn === null) {
		return null; // Or a loading spinner
	}

	return (
		<>
			<Navbar
				onLoginClick={() => setShowLogin(true)}
				onSignupClick={() => setShowSignup(true)}
				onSignOutClick={handleSignOut}
				isLoggedIn={isLoggedIn}
			/>
			<main className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
				<h1 className="text-4xl font-bold text-green-700 mb-8">Your Pantry</h1>
				<p className="text-gray-600 mb-4">Here you’ll see your food items soon!</p>
				{/* Later: List food items here */}
			</main>
			<Footer />
		</>
	);
}
