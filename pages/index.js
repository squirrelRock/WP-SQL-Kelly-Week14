import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
    return (
        <Layout home>
            <h1 className="text-center mb-4 py-3">SQL for Squirrels Home</h1>
            <div className="container">
        
            <div className="row g-3">

                    {/* squirrel posts button */}
                    <div className="col-lg-4 col-md-12">
                        <Link href="/squirrels" passHref>
                            <div className="square-button">
                                <div className="image-container">
                                    <Image
                                        src="https://dev-kdurkin-sql.pantheonsite.io/wp-content/uploads/2024/11/douglasM-square.webp" 
                                        alt="Squirrel Posts"
                                        width={300}
                                        height={300}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Squirrel Posts</span>
                            </div>
                        </Link>
                    </div>
            
                    {/* rocks for sale button */}
                    <div className="col-lg-4 col-md-12">
                        <Link href="/rocks4sale" passHref>
                            <div className="square-button">
                                <div className="image-container">
                                    <Image
                                        src="https://dev-kdurkin-sql.pantheonsite.io/wp-content/uploads/2024/11/zenPurple1024_1024.webp"
                                        alt="Rocks for Sale"
                                        width={300} 
                                        height={300}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Rocks for Sale</span>
                            </div>
                        </Link>
                    </div>


                    {/* new members button */}
                    <div className="col-lg-4 col-md-12">
                        <Link href="/chipmunks" passHref>
                            <div className="square-button">
                                <div className="image-container">
                                    <Image
                                        src="https://dev-kdurkin-sql.pantheonsite.io/wp-content/uploads/2024/11/1024px-Tamias_sonomae.webp"
                                        alt="New Members"
                                        width={300}
                                        height={300}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <span>Chipmunk Annex</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}