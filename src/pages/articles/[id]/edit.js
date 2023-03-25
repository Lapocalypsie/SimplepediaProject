import { useRouter } from "next/router";
import Editor from "../../../components/Editor";
import ArticleShape from "../../../components/ArticleShape";
import styles from "../../../styles/Editor.module.css";
import PropTypes from "prop-types";

export default function SimplepediaEditor({
  collection,
  setCollection,
  setCurrentArticle,
  currentArticle,
}) {
  const router = useRouter();

  const complete = (newArticle) => {
    if (newArticle) {
      if (newArticle.id === 0) {
        const maxId = collection.reduce((acc, cur) => Math.max(acc, cur.id), 0);
        newArticle.id = maxId;
      }
      const createdArticle = {
        id: newArticle.id,
        title: newArticle.title,
        contents: newArticle.contents,
        edited: newArticle.edited,
      };
      const newCollection = collection.map((article) => {
        if (article.id === currentArticle.id) {
          return createdArticle;
        } else {
          return article;
        }
      });
      // Add new article to collection
      setCollection(newCollection);
      // Set the current article to the newly created one
      setCurrentArticle(createdArticle);
      router.push(`/articles/${createdArticle.id}`);
    } else {
      // User canceled, go back to previous page
      router.back();
    }
  };

  return (
    <div className={styles.Editor}>
      <Editor article={currentArticle} complete={complete} />
    </div>
  );
}

SimplepediaEditor.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCollection: PropTypes.func.isRequired,
  setCurrentArticle: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
};
