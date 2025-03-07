'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center animate-bg-slide" style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.HL4M_vnkJSW5lNLjdpsJfgHaEm?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')" }}>
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-5 text-gray-700">Manage Your Stock with Ease</h1>
       
      </div>
      <style jsx>{`
        @keyframes slide {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }

        .animate-bg-slide {
          animation: slide 10s linear infinite;
        }
      `}</style>
    </main>
  );
}
