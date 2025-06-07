export default function Footer() {
	return (
		<footer className="w-full bg-green-900 py-4 px-8 flex justify-between items-center mt-auto">
			<span className="text-white text-sm">
				&copy; {new Date().getFullYear()} ShelfLife - Benjamin Peek
			</span>
			<div className="flex gap-4">
				<a
					href="https://github.com/benjaminpeek/shelf-life"
					target="_blank"
					rel="noopener noreferrer"
					className="text-white hover:underline"
				>
					GitHub
				</a>
				<a href="mailto:contact@shelflife.com" className="text-white hover:underline">
					Contact
				</a>
			</div>
		</footer>
	);
}
