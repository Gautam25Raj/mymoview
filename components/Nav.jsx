import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-gray-900/10 backdrop-blur-sm">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            className="h-8 mr-3"
            height={32}
            width={32}
            alt="MyMoView Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            MyMoView
          </span>
        </Link>

        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-gray-800 hover:bg-gray-700 hover:scale-105 focus:bg-gray-800 active:scale-95"
          >
            Get started
          </button>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 md:text-gray-500 hover:scale-105 active:scale-95"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore/movies"
                className="block py-2 pl-3 pr-4 md:p-0 md:hover:text-gray-500 text-white hover:scale-105 active:scale-95"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/explore/shows"
                className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-gray-500 text-white hover:scale-105 active:scale-95"
              >
                TV Shows
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
