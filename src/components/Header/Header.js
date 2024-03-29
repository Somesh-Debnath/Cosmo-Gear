import Link from 'next/link';
import { useSnipcart } from 'use-snipcart';
import { signInWithPopup, signOut } from "firebase/auth";
import { FaShoppingCart, FaRegUserCircle} from 'react-icons/fa';
import useAuth from "@lib/firebaseAuthHook";
import { auth, provider } from "@lib/firebase"
import Container from '@components/Container';
import Image from 'next/image';

import styles from './Header.module.scss';

const Header = () => {
  const { cart = {} } = useSnipcart();
  const { user, loading } = useAuth()
  console.log(user)

    const handleLogin = async () => {
        if (!user) {
            signInWithPopup(auth, provider)
                .then((res) => {
                    const user = res.user
                    console.log(user)
                })
                .catch(e => console.log(e.message))
        } else {
            signOut(auth)
        }
    }
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Cosmo Gear</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/products/">
              <a>Products</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>About</a>
            </Link>
          </li>
        </ul>
        <p className={styles.headerCart}>
          <button className="snipcart-checkout">
            <FaShoppingCart />
            <span>
              ${ cart.subtotal?.toFixed(2) }
            </span>
          </button>
        </p>
        <div onClick={handleLogin} className={styles.headerLocales}>
          {
            user ? ( 
                 <img src={user.photoURL}/>
            ) : (
                <FaRegUserCircle  />
              
            )
          }
        </div>

      </Container>
    </header>
  )
}


export default Header;