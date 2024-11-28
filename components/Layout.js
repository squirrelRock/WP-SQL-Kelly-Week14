import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;

  // Determine if on specific pages
  const isMain = pathname === '/';
  const isRocks4Sale = pathname.startsWith('/rocks4sale');
  const isSquirrels = pathname === '/squirrels';
  const isChipmunks = pathname.startsWith('/chipmunks');

  return (
    <>
      <Head>
        <title>WordPress SQL</title>
        <link rel="icon" href="/cropped-foxy.png" />
      </Head>
      <header>
        <nav className="navbar navbar-light p-3" style={{ backgroundColor: '#e3f2fd' }}>
       
          <Link href="/" className="navbar-brand">
          <Image
      src="https://dev-kdurkin-sql.pantheonsite.io/wp-content/uploads/2024/11/foxy.png"
        alt="SQL for Squirrels Logo"
        width={80}
        height={80} 
        style={{ width: 'auto', height: '80px' }} 
        priority 
        />
          </Link>

          {/* Nav */}
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-1">
              <Link href="/" className={`btn ${isMain ? 'btn-info active' : 'btn-secondary'} mx-1`}>
                Home
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link href="/squirrels" className={`btn ${isSquirrels ? 'btn-info active' : 'btn-secondary'} mx-1`}>
                Squirrels
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link href="/rocks4sale" className={`btn ${isRocks4Sale ? 'btn-info active' : 'btn-secondary'} mx-1`}>
                Rocks 4 Sale
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link href="/chipmunks" className={`btn ${isChipmunks ? 'btn-info active' : 'btn-secondary'} mx-1`}>
                Chipmunks
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="container flex p-2 pt-4">{children}</div>
      </main>

      <footer>
        <div className="container pt-5 pb-2 small text-center">
          <p>All rights reserved &copy; 2024 - SQL for Squirrels</p>
        </div>
      </footer>
    </>
  );
}