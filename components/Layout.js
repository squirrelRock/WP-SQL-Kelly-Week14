import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;

  // Determine if on the home page or secondary page
  const isMain = pathname === '/';

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
              {/* <Link href="/secondary" className={`btn ${isSecondary ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
                Supporting
              </Link> */}
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