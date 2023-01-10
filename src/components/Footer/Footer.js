import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <p>
       Made with ❤ by <a href="https://github.com/Somesh-Debnath">Somesh Debnath</a>
      </p>
    </footer>
  )
}

export default Footer;