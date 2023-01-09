/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

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
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height}
               src={heroBackground.url} alt="hero-img" />
            </a>
          </Link>
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
                  <Button>
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
    uri: 'https://api-ap-south-1.hygraph.com/v2/clcn3l7n03bu601rre7ypgu6g/master',
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