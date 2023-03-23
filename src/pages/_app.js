/* eslint-disable */
import "../styles/globals.css";
import { useState } from "react";
import Head from "next/head";

import data from "../../data/seed.json";
import styles from "../styles/Simplepedia.module.css";
import { useRouter } from "next/router";

function MainApp({ Component, pageProps }) {
  const [collection, setCollection] = useState(data);

  const router = useRouter();
  const { id } = router.query;

  let currentArticle;
  if (id !== undefined) {
    currentArticle = collection.find((article) => article.id === Number(id));
  } else currentArticle = undefined;

  function setCurrentArticle(article) {
    if (article === undefined) {
      router.push("/articles");
    } else {
      router.push(`/articles/${article.id}`);
    }
  }

  const props = {
    ...pageProps,
    collection,
    setCollection,
    currentArticle,
    setCurrentArticle,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Simplepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Simplepedia</h1>
        <Component {...props} />
      </main>

      <footer>CS 312 Assignment 3</footer>
    </div>
  );
}

export default MainApp;

//       {currentArticle ? <Article article={currentArticle} /> : null}
//   const [currentArticle, setCurrentArticle] = useState(null);
// to insert at l26 and l9 ?
