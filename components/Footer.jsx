import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="rounded-lg shadow bg-gray-900 max-w-screen-2xl mx-auto m-4">
      <div className="w-full p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <Image
              src="/logo.svg"
              width={32}
              height={32}
              className="h-8 mr-3"
              alt="MeMo View Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              MyMoView
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <Link href="/" className="mr-4 hover:underline md:mr-6 ">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore/movies"
                className="mr-4 hover:underline md:mr-6"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/explore/shows"
                className="mr-4 hover:underline md:mr-6 "
              >
                TV Shows
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm  sm:text-center text-gray-400">
          © 2023{' '}
          <a href="/" className="hover:underline">
            MyMoView™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
