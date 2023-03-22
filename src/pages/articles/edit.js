import { useState } from "react";
import { useRouter } from "next/router";
import Editor from "../../components/Editor";
import ArticleShape from "../../components/ArticleShape";
import styles from "../../styles/Editor.module.css";
import PropTypes from "prop-types";

export default function SimplepediaCreator({
  collection,
  setCollection,
  setCurrentArticle,
}) {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [article, setArticle] = useState(null);

  const complete = (newArticle) => {
    if (newArticle) {
      // Find largest id in collection
      const maxId = collection.reduce((acc, cur) => Math.max(acc, cur.id), 0);
      // Create new article with unique id
      const createdArticle = {
        id: maxId + 1,
        title: newArticle.title,
        contents: newArticle.contents,
        edited: newArticle.edited,
      };
      // Add new article to collection
      setCollection([...collection, createdArticle]);
      // Set the current article to the newly created one
      setCurrentArticle(createdArticle);
    } else {
      // User canceled, go back to previous page
      router.back();
    }
  };

  return (
    <div className={styles.Editor}>
      <Editor article={article} complete={complete} />
    </div>
  );
}

SimplepediaCreator.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
};
