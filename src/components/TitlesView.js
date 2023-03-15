/*
  TitleList.js

  This module displays a list of titles and reports when a user clicks on one.

  props:
    titles - an array of objects with title and id properties
    setCurrentArticle - a callback that expects an article as an argument

*/
import ArticleShape from "./ArticleShape";
import PropTypes from "prop-types";

export default function TitlesView({ articles, setCurrentArticle }) {
 
  const copyArticles = [...articles].sort((a, b) =>
  a.title.localeCompare(b.title)
);

const returnArticle = (article) => {
  setCurrentArticle(article);
};

return (
  <ul>
    {copyArticles.map((article) => (
      <li
        key={article.title}
        data-testid="title"
        onClick={() => returnArticle(article)}
      >
        {article.title}
      </li>
    ))}
  </ul>
);
}

TitlesView.propTypes = {
  articles: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired
}