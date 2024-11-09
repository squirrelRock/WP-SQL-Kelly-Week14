import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';


  export default function Layout({ children }) {
    const router = useRouter();
    const { pathname } = router;
  
    // Determine if on the home page or secondary page
    const isMain = pathname === '/';
    // const isSecondary = pathname === '/secondary';

  return (
    <>
      <Head>
        <title>Shōgun</title>
      </Head>
      <header>
        <nav className="navbar navbar-light p-3" style={{ backgroundColor: '#e3f2fd' }}>
          <h1><em>Shōgun</em></h1>
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
      <div className = "container flex p-2 pt-4">
      {children}
      </div>
        
      </main>

      <footer>
        <div className='container p-2 small '>
          <p>Shōgun is a 10-part television series produced by FX on Hulu, released 2024.</p>
        </div>
      </footer>
    </>
  );
}

