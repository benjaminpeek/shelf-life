import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pantry() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
				<h1 className="text-4xl font-bold text-green-700 mb-8">Your Pantry</h1>
				<p className="text-gray-600 mb-4">Here you’ll see your food items soon!</p>
				{/* Later: List food items here */}
			</main>
			<Footer />
		</>
	);
}
