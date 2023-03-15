/*
  Article.js

  The Article displays the contents of an article.

  props:
    article - The article to render
*/
import styles from "../styles/Article.module.css";
import ArticleShape from "./ArticleShape";
import PropTypes from "prop-types";



export default function Article({ article }) {
  
  
  const stringDate = new Date(article.edited).toLocaleString();


   return (
    <div className={styles.article}>
      <h2>{title}</h2>
      <p>{contents}</p>
      <p className={styles.timestamp}> {stringDate}</p>
    </div>
  );
}

Article.propTypes = {
  article : ArticleShape.isRequired
};