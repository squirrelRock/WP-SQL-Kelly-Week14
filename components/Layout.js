import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
        <title>Wordpress SQL</title>
        <link rel="icon" href="/cropped-foxy.png" />
      </Head>
      <header>
        <nav className="navbar navbar-light p-3" style={{ backgroundColor: '#e3f2fd' }}>
          <h1><em>Basic Headless CMS-Powered App</em></h1>
          <ul className='navbar-nav'>
            <span>
              <Link href="/" className={`btn ${isMain ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
                Main
              </Link>
              <Link href="/rocks4sale" className={`btn ${isRocks4Sale ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
                Rocks 4 Sale
              </Link>
              <Link href="/squirrels" className={`btn ${isSquirrels ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
                Squirrels
              </Link>
              <Link href="/chipmunks" className={`btn ${isChipmunks ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
                Chipmunks
              </Link>
            </span>
          </ul>
        </nav>
      </header>

      <main>
        <div className="container flex p-2 pt-4">
          {children}
        </div>
      </main>

      <footer>
        <div className='container p-2 small'>
          <p>temp footer</p>
        </div>
      </footer>
    </>
  );
}