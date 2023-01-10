/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Layout from '@components/Layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Container from '@components/Container';
import Button from '@components/Button';
import { buildImage } from '@lib/cloudinary';
import products from '@data/products';

import styles from '@styles/Page.module.scss'

export default function Home({home,products}) {
  console.log(products);
  const {heroBackground,heroLink,heroText,heroTitle}=home;
  return (
    <Layout>
      <Head>
        <title>Space Jelly Gear</title>
        <meta name="description" content="Get your Space Jelly gear!" />
      </Head>

      <Container>
        <h1 className="sr-only">Space Jelly Gear</h1>

      <div className={styles.hero}>
        <Carousel 
         infiniteLoop={true}
          autoPlay={true}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={2000}
          transitionTime={900}

        >
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              
                <div>
                <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height}
               src={buildImage(heroBackground.public_id).toURL()} alt="hero-img" />
                </div>
              
            </a>
          </Link>

          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              
                <div>
                <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height}
               src={buildImage(heroBackground.public_id).toURL()} alt="hero-img" />
                </div>
              
            </a>
          </Link>

          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              
                <div>
                <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height}
               src={buildImage(heroBackground.public_id).toURL()} alt="hero-img" />
                </div>
              
            </a>
          </Link>
        </Carousel>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.map(product => {
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img width={product.image.width} height={product.image.height} src={product.image.url} alt="" />
                    </div>
                    <h3 className={styles.productTitle}>
                      { product.name }
                    </h3>
                    <p className={styles.productPrice}>
                      ${ product.price }
                    </p>
                  </a>
                </Link>
                <p>
                    <Button
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-url={`/products/${product.slug}`}
                    data-item-image={product.image.url}
                    data-item-name={product.name}
                  >
                    Add to Cart
                  </Button>
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export async function getStaticProps(){
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
    query PageHome {
      page(where: {slug: "home"}) {
        id
        heroLink
        heroText
        heroTitle
        name
        slug
        heroBackground 
      }
      products(where: {categories_some: {slug: "featured"}}) {
        id
        name
        price
        slug
        image 
      }
    }

  `
  });    
  
  const home=data.data.page;
  const products=data.data.products;
  console.log(products)
  return{
    props:{
      home,
      products
    }
  }
}