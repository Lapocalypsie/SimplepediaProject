/*
  TitleList.js

  This module displays a list of titles and reports when a user clicks on one.

  props:
    titles - an array of objects with title and id properties
    setCurrentArticle - a callback that expects an article as an argument

*/
import ArticleShape from "./ArticleShape";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

export default function TitlesView({ articles, setCurrentArticle }) {
  const copyArticles = [...articles].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const returnArticle = (article) => {
    setCurrentArticle(article);
  };

  const NoBulletList = styled("ul")(() => ({
    listStyle: "none",
    paddingLeft: 0,
  }));

  return (
    <NoBulletList>
      {copyArticles.map((article) => (
        <li
          key={article.title}
          data-testid="title"
          onClick={() => returnArticle(article)}
        >
          {article.title}
        </li>
      ))}
    </NoBulletList>
  );
}

TitlesView.propTypes = {
  articles: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
